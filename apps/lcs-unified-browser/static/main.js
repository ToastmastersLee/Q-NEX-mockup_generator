const get = id => document.getElementById(id);
const form = get('filters');
const video = get('video');
const number = new Intl.NumberFormat('zh-CN');
const pageSize = 12;
const connections = new Map();
const deviceNames = new Map();
const catalogResults = new Map();
let mode = 'demo';
let statusRequest;
let listRequest;
let playbackRequest;
let rows = [];
let page = 0;
let selected;

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function endpoint(path, values = {}) {
  const query = new URLSearchParams({ mode, ...values });
  return '/api/' + path + '?' + query;
}

async function fetchData(url, signal) {
  const response = await fetch(url, { signal });
  if (response.ok) return response.json();
  const body = await response.json().catch(() => ({}));
  throw new Error(typeof body.detail === 'string' ? body.detail : '查询失败，请刷新重试');
}

function formatBytes(bytes) {
  if (bytes === null) return '未获取';
  const sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
  let index = 0;
  while (bytes >= 1024 && index < sizes.length - 1) {
    bytes /= 1024;
    index++;
  }
  return new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 2 }).format(bytes) + ' ' + sizes[index];
}

function renderDevices(devices) {
  const display = {
    online: mode === 'demo' ? '模拟在线' : '在线',
    offline: '离线', error: '状态查询失败', unconfigured: '未配置',
  };
  const cards = devices.map(device => {
    connections.set(device.id, device.connection);
    deviceNames.set(device.id, device.room);
    get('room').querySelector('[value="' + device.id + '"]').textContent = device.room;
    const card = element('article', undefined, 'device');
    const head = element('div', undefined, 'device-head');
    const name = element('div');
    name.append(element('h3', device.room), element('p',
      [device.model || 'LCS810', device.ip || (mode === 'demo' ? '模拟设备' : 'IP 未配置')].join(' · '),
      'device-sub'));
    head.append(name, element('span', display[device.connection],
      device.connection === 'online' ? 'badge' : 'badge warning'));
    const metrics = element('dl', undefined, 'metrics');
    for (const [label, size] of [['磁盘总量', device.total_mb], ['已用', device.used_mb], ['剩余', device.free_mb]]) {
      const metric = element('div');
      metric.append(element('dt', label), element('dd', size === null ? '未获取' : number.format(size) + ' MB'));
      metrics.append(metric);
    }
    const bar = element('div', undefined, 'storage');
    bar.setAttribute('aria-hidden', 'true');
    const fill = element('div');
    fill.style.width = (device.total_mb && device.used_mb !== null
      ? 100 * device.used_mb / device.total_mb : 0) + '%';
    bar.append(fill);
    const time = new Date(device.updated_at).toLocaleTimeString('zh-CN', { hour12: false });
    card.append(head, metrics, bar, element('p',
      [device.recording, device.error, '更新 ' + time].filter(Boolean).join(' · '), 'device-foot'));
    return card;
  });
  get('devices').replaceChildren(...cards);
}

async function loadDevices(refresh = false) {
  statusRequest?.abort();
  const request = new AbortController();
  statusRequest = request;
  try {
    const data = await fetchData(endpoint('devices', { refresh }), request.signal);
    if (request !== statusRequest) return;
    const prior = [...connections.values()].join();
    renderDevices(data.devices);
    if (prior !== [...connections.values()].join()) renderRows();
  } catch (error) {
    if (request === statusRequest && error.name !== 'AbortError') {
      connections.clear();
      get('devices').replaceChildren(element('p', '无法读取设备状态，请刷新重试'));
      renderRows();
    }
  }
}

function renderRows() {
  const pages = Math.ceil(rows.length / pageSize);
  get('count').textContent = number.format(rows.length) + ' 条录像';
  get('pagination').hidden = pages < 2;
  get('page').textContent = (page + 1) + ' / ' + pages;
  get('previous').disabled = page === 0;
  get('next').disabled = page + 1 >= pages;
  const elements = rows.slice(page * pageSize, (page + 1) * pageSize).map(row => {
    const tr = element('tr');
    if (selected === row.id) tr.classList.add('selected');
    const title = element('td');
    const file = element('span', row.filename, 'file');
    file.title = row.filename;
    title.append(element('strong', row.title), file);
    const stale = catalogResults.get(row.device_id)?.stale;
    const play = element('button', '播放');
    play.type = 'button';
    play.setAttribute('aria-label', '播放 ' + row.room + ' ' + row.filename);
    play.disabled = stale || ['offline', 'unconfigured'].includes(connections.get(row.device_id));
    play.addEventListener('click', () => selectRecording(row));
    const action = element('td');
    action.append(play);
    tr.append(title, element('td', row.teacher), element('td', row.start_time || '未获取'),
      element('td', formatBytes(row.size_bytes)), element('td', row.room + (stale ? ' · 过期' : '')), action);
    return tr;
  });
  get('rows').replaceChildren(...elements);
}

async function search(refresh = false) {
  listRequest?.abort();
  const request = new AbortController();
  listRequest = request;
  const values = Object.fromEntries([...new FormData(form)].filter(([, value]) => value));
  get('list-status').textContent = '正在查询录像…';
  try {
    const data = await fetchData(endpoint('recordings', { ...values, refresh }), request.signal);
    if (request !== listRequest) return;
    rows = data.recordings;
    page = 0;
    catalogResults.clear();
    data.devices.forEach(result => catalogResults.set(result.device_id, result));
    const messages = data.devices.map(result => {
      const name = deviceNames.get(result.device_id) || (result.device_id === 'a' ? '三楼' : '一楼');
      const count = rows.filter(row => row.device_id === result.device_id).length;
      if (result.complete) return name + ' · ' + count + ' 条';
      return name + '：' + (result.stale ? '显示过期结果 · ' : '列表不完整 · ') + result.error;
    });
    get('list-status').classList.toggle('warning', data.devices.some(result => !result.complete));
    if (!rows.length && data.devices.every(result => result.complete)) messages.push('没有符合条件的录像');
    get('list-status').textContent = messages.join('　');
  } catch (error) {
    if (request !== listRequest || error.name === 'AbortError') return;
    rows = [];
    page = 0;
    get('list-status').classList.add('warning');
    get('list-status').textContent = error.message;
  }
  renderRows();
}

function stopPlayback() {
  playbackRequest?.abort();
  playbackRequest = undefined;
  selected = undefined;
  video.pause();
  video.removeAttribute('src');
  video.load();
  video.hidden = true;
  get('placeholder').hidden = false;
  for (const id of ['video-title', 'video-source', 'video-filename', 'video-detail', 'video-message']) {
    get(id).textContent = '';
  }
}

async function selectRecording(row) {
  stopPlayback();
  selected = row.id;
  playbackRequest = new AbortController();
  const request = playbackRequest;
  const path = 'recordings/' + row.id + '/';
  get('video-title').textContent = row.title;
  get('video-source').textContent = '来源 ' + row.room;
  get('video-filename').textContent = row.filename;
  get('video-message').textContent = '正在加载视频…';
  get('placeholder').hidden = true;
  video.hidden = false;
  video.src = endpoint(path + 'media');
  video.play().catch(error => {
    if (request === playbackRequest && error.name === 'NotAllowedError') {
      get('video-message').textContent = '点击播放器内的播放按钮继续';
    }
  });
  renderRows();
  try {
    const detail = await fetchData(endpoint(path + 'details'), request.signal);
    if (request === playbackRequest) get('video-detail').textContent =
      [detail.duration, detail.resolution, detail.code, detail.audioCode].filter(Boolean).join(' · ');
  } catch {
    // File details are optional and do not affect playback.
  }
}

video.addEventListener('playing', () => { get('video-message').textContent = ''; });
video.addEventListener('error', async () => {
  if (!playbackRequest || !video.error || !video.src) return;
  const request = playbackRequest;
  const code = video.error.code;
  let message = code === 3 || code === 4
    ? '浏览器无法解码此录像，请核对视频编码或在设备原生页面播放'
    : '视频加载中断，请重试';
  try {
    const probe = await fetch(video.src, { signal: request.signal, headers: { Range: 'bytes=0-0' } });
    if (!probe.ok) {
      const error = await probe.json().catch(() => ({}));
      message = typeof error.detail === 'string' ? error.detail : '无法读取录像（HTTP ' + probe.status + '）';
    } else {
      await probe.body?.cancel();
    }
  } catch (error) {
    if (error.name === 'AbortError') return;
    message = '无法连接录像服务，请检查网络后重试';
  }
  if (request === playbackRequest) get('video-message').textContent = message;
});

function changeMode(next) {
  if (mode === next) return;
  mode = next;
  stopPlayback();
  form.reset();
  rows = [];
  page = 0;
  connections.clear();
  deviceNames.clear();
  catalogResults.clear();
  get('devices').replaceChildren();
  get('mode-notice').textContent = mode === 'demo'
    ? '演示数据 · 当前使用模拟设备和本地示例视频' : '真机模式 · 读取配置中的两台录播机';
  get('mode-notice').classList.toggle('live', mode === 'live');
  document.querySelectorAll('[data-mode]').forEach(button =>
    button.setAttribute('aria-pressed', button.dataset.mode === mode));
  renderRows();
  loadDevices();
}

document.querySelectorAll('[data-mode]').forEach(button =>
  button.addEventListener('click', () => changeMode(button.dataset.mode)));
get('refresh').addEventListener('click', () => { loadDevices(true); search(true); });
form.addEventListener('submit', event => { event.preventDefault(); search(); });
form.addEventListener('reset', () => { setTimeout(() => search(), 0); });
get('previous').addEventListener('click', () => { page--; renderRows(); });
get('next').addEventListener('click', () => { page++; renderRows(); });
loadDevices();
search();
setInterval(() => loadDevices(), 10_000);
