// One silent monitor. Browser requests never contain device RTSP credentials.
const copy = {
  zh: ['连接画面中', '上次更新', '等待新画面', '未分配双屏视频', '暂无接收流', '实验室电脑缺少 FFmpeg', '预览不可用', '样片', '清理后重连'],
  en: ['Connecting', 'Updated', 'Waiting for new frames', 'No dual-screen assignment', 'No receive stream', 'FFmpeg is missing on the lab PC', 'Preview unavailable', 'Sample', 'Reconnecting'],
  fr: ['Connexion', 'Actualisé', 'En attente d’images', 'Aucune affectation double écran', 'Aucun flux reçu', 'FFmpeg absent du PC de laboratoire', 'Aperçu indisponible', 'Exemple', 'Reconnexion'],
};
const sdkLoads = new Map();
const decoder = new TextDecoder('ascii');
const MAX_FRAME = 2 * 1024 * 1024;

function loadSdk(room) {
  if (typeof window.R3c === 'function') return Promise.resolve();
  if (sdkLoads.has(room)) return sdkLoads.get(room);
  const loading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '/api/preview/' + room + '/sdk';
    script.onload = () => {
      script.remove();
      if (typeof window.R3c === 'function') resolve();
      else reject(new Error('player'));
    };
    script.onerror = () => { script.remove(); reject(new Error('player')); };
    document.head.append(script);
  }).finally(() => sdkLoads.delete(room));
  sdkLoads.set(room, loading);
  return loading;
}

function headerEnd(bytes) {
  for (let i = 0; i < bytes.length - 3; i++) {
    if (bytes[i] === 13 && bytes[i + 1] === 10 && bytes[i + 2] === 13 && bytes[i + 3] === 10) return i;
  }
  return -1;
}

async function playMultipart(response, canvas, signal, frame) {
  const reader = response.body.getReader();
  const ctx = canvas.getContext('2d', {alpha: false});
  let pending = new Uint8Array(), size = 0, stamp;
  try {
    while (!signal.aborted) {
      const {value, done} = await reader.read();
      if (done) break;
      const bytes = new Uint8Array(pending.length + value.length);
      bytes.set(pending);
      bytes.set(value, pending.length);
      pending = bytes;
      while (!signal.aborted) {
        if (!size) {
          const end = headerEnd(pending);
          if (end < 0) {
            if (pending.length > 2048) throw new Error('frame header');
            break;
          }
          const head = decoder.decode(pending.subarray(0, end));
          size = Number(/^Content-Length:\s*(\d+)\s*$/mi.exec(head)?.[1]);
          stamp = Number(/^X-Time:\s*(\d+)\s*$/mi.exec(head)?.[1]);
          if (!size || size > MAX_FRAME) throw new Error('frame size');
          pending = pending.subarray(end + 4);
        }
        if (pending.length < size) break;
        const jpg = new Blob([pending.subarray(0, size)], {type: 'image/jpeg'});
        pending = pending.subarray(size);
        size = 0;
        const bitmap = await createImageBitmap(jpg);
        try {
          if (signal.aborted) return;
          if (canvas.width !== bitmap.width || canvas.height !== bitmap.height) {
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
          }
          ctx.drawImage(bitmap, 0, 0);
          frame(stamp);
        } finally { bitmap.close(); }
      }
    }
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

function releaseNativePlayer(player) {
  // This firmware's destroy() unregisters its event bus, but leaves an MSE
  // updateend listener queued and can replace its player after a reconnect.
  const visited = new Set();
  while (player && !visited.has(player)) {
    visited.add(player);
    const loader = player.websocketLoader;
    const buffer = player.bufferController;
    const next = loader?.r3ci;
    if (loader) {
      clearTimeout(loader.timerDisconnect);
      const socket = loader.client;
      if (socket) {
        socket.onmessage = socket.onopen = null;
        if (socket.readyState === WebSocket.CONNECTING) socket.close();
      }
    }
    if (buffer) {
      for (const track of Object.values(buffer.sourceBuffer || {})) {
        track?.removeEventListener('updateend', buffer.onsbue);
      }
      buffer.segments = [];
      for (const [event, handler] of [
        ['sourceopen', buffer.onmso], ['sourceended', buffer.onmse], ['sourceclose', buffer.onmsc],
      ]) {
        if (handler) buffer.mediaSource?.removeEventListener(event, handler);
      }
    }
    player.destroy();
    player = next;
  }
}

export function mountMonitor(container, {room, ip, kind, mode, lang = 'zh', channel, source, label}) {
  const words = copy[lang] || copy.en;
  const incoming = mode === 'live' && (kind === 'out1' || kind === 'out2');
  const media = document.createElement(incoming ? 'canvas' : 'video');
  const view = document.createElement('div');
  view.className = 'lcs-monitor-frame';
  view.style.cssText = 'width:100%;height:100%;min-height:1px;aspect-ratio:16/9;position:relative;overflow:hidden;background:#111a20;color:white;';
  media.style.cssText = 'width:100%;height:100%;display:block;object-fit:contain;visibility:hidden';
  media.setAttribute('aria-label', label || kind);
  if (media.tagName === 'VIDEO') {
    media.playsInline = true;
    media.autoplay = true;
    media.muted = true;
  }
  const note = document.createElement('span');
  note.style.cssText = 'position:absolute;bottom:6px;right:8px;max-width:96%;font:12px/1.4 system-ui,sans-serif;background:rgba(4,15,23,.8);color:white;border-radius:3px;padding:2px 6px;pointer-events:none';
  view.append(media, note);
  container.replaceChildren(view);

  let stopped = false, serial = 0, player, controller, retryTimer, started, last;
  let frameCounter = -1, lastMessage = '', connectError = false;
  function status(message, valid = false) {
    if (lastMessage !== message) { note.textContent = message; lastMessage = message; }
    media.style.visibility = valid ? 'visible' : 'hidden';
    view.dataset.status = valid ? 'playing' : 'waiting';
  }
  function sawFrame(stamp) {
    last = Date.now();
    const clock = new Date(stamp || last).toLocaleTimeString(lang, {hour12: false});
    status((mode === 'demo' ? words[7] : words[1]) + ' · ' + clock, true);
  }
  function closePlayer() {
    controller?.abort();
    controller = undefined;
    if (player) {
      try { releaseNativePlayer(player); } catch { /* The device can disconnect during teardown. */ }
      player = undefined;
    }
    if (media.tagName === 'VIDEO') {
      const objectUrl = media.src.startsWith('blob:') ? media.src : '';
      media.pause();
      media.removeAttribute('src');
      media.load();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    }
  }
  function reconnect(message) {
    if (stopped || retryTimer) return;
    serial++;
    closePlayer();
    status(message);
    connectError = true;
    retryTimer = setTimeout(() => { retryTimer = 0; start(); }, 3500);
  }
  async function start() {
    const current = ++serial;
    connectError = false;
    last = 0;
    started = Date.now();
    frameCounter = -1;
    status(words[0]);
    try {
      if (mode === 'demo') {
        media.loop = true;
        media.src = source || '/static/sample-' + room + '.mp4';
        await media.play();
      } else if (incoming) {
        controller = new AbortController();
        const signal = controller.signal;
        const r = await fetch('/api/preview/' + room + '/' + kind, {signal, cache: 'no-store'});
        if (!r.ok) {
          const detail = (await r.json().catch(() => ({}))).detail;
          if (current !== serial || stopped) return;
          reconnect(words[{unassigned: 3, no_stream: 4, unavailable: 4, missing_ffmpeg: 5}[detail] ?? 6]);
          return;
        }
        await playMultipart(r, media, signal, stamp => { if (current === serial) sawFrame(stamp); });
        if (!stopped && current === serial) reconnect(words[2]);
      } else {
        await loadSdk(room);
        if (stopped || current !== serial) return;
        const number = Number.isInteger(channel) ? channel : kind === 'pgm' ? 0 : 7;
        player = new window.R3c();
        player.attachMedia(media, 'ch' + number, 'H264Raw', 'stream' + number + '-protocol', 'ws://' + ip + ':9898/xxx');
        media.play().catch(() => {});
      }
    } catch {
      if (!stopped && current === serial) reconnect(words[6]);
    }
  }
  const timer = setInterval(() => {
    if (stopped || connectError || document.hidden) return;
    if (!incoming && media.readyState >= 2 && media.currentTime > 0) {
      const count = media.getVideoPlaybackQuality?.().totalVideoFrames ?? media.currentTime;
      if (count !== frameCounter) {
        frameCounter = count;
        sawFrame();
      }
    }
    if (last && Date.now() - last > 3200) status(words[2]);
    if (Date.now() - (last || started) > (last ? 6500 : 12500)) reconnect(words[8]);
  }, 450);
  start();
  return () => {
    stopped = true;
    serial++;
    clearInterval(timer);
    clearTimeout(retryTimer);
    closePlayer();
    view.remove();
  };
}
