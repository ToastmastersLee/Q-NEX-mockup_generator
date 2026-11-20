const copy = {
  zh: {
    title: '录像库', refresh: '刷新', floorA: '三楼', floorB: '一楼', demo: '演示设备',
    storage: '设备存储', used: '已用', free: '剩余', total: '总量', unknown: '未获取',
    online: '在线', offline: '离线', error: '状态读取失败', unconfigured: '未配置',
    recording: '录制中', paused: '已暂停', idle: '空闲', at: '更新于', refreshFail: '读取失败，请刷新重试。',
    room: '来源教室', all: '全部教室', from: '开始日期', to: '结束日期', keyword: '搜索',
    placeholder: '课程、教师或录像文件名', clear: '清空', rangeInvalid: '结束日期应晚于或等于开始日期。',
    loading: '正在读取录像…', stale: '上次结果 · 设备暂时不可用', partial: '目录读取不完整', none: '没有符合条件的录像。',
    sessions: '堂课', files: '个文件', course: '课程', instructor: '教师', date: '录制时间',
    source: '来源', tracks: '文件', action: '回放', open: '打开', previous: '上一页', next: '下一页',
    unnamed: '未标注', player: '网页录像回放', pick: '从下方列表打开一堂课。', single: '单路', paired: '双路联动',
    left: '左画面', right: '右画面', file: '录像文件', play: '播放', pause: '暂停', pending: '等待视频加载…',
    audio: '声音来源', muted: '静音', seek: '播放位置', fullscreen: '全屏', exitFullscreen: '退出全屏',
    block: '请再点一次播放。', failed: '无法播放，请重试或更换录像文件。',
    retry: '重新加载', auth: '来源设备拒绝访问录像。', missing: '来源设备上的录像文件不存在。',
    unavailable: '来源设备不可用。', codec: '浏览器无法解码此录像。', buffering: '正在缓冲…',
  },
  en: {
    title: 'Recordings', refresh: 'Refresh', floorA: 'Third floor', floorB: 'First floor', demo: 'Demo device',
    storage: 'Recorder storage', used: 'Used', free: 'Available', total: 'Total', unknown: 'Unavailable',
    online: 'Online', offline: 'Offline', error: 'Status unavailable', unconfigured: 'Not configured',
    recording: 'Recording', paused: 'Paused', idle: 'Idle', at: 'Updated', refreshFail: 'Could not load data. Refresh to retry.',
    room: 'Classroom', all: 'All classrooms', from: 'From', to: 'To', keyword: 'Search',
    placeholder: 'Course, instructor or filename', clear: 'Clear', rangeInvalid: 'End date must be on or after the start date.',
    loading: 'Loading recordings…', stale: 'Cached results · device unavailable', partial: 'Incomplete catalog', none: 'No recordings match these filters.',
    sessions: 'sessions', files: 'files', course: 'Course', instructor: 'Instructor', date: 'Recorded on',
    source: 'Source', tracks: 'Files', action: 'Playback', open: 'Open', previous: 'Previous', next: 'Next',
    unnamed: 'Unspecified', player: 'Browser playback', pick: 'Open a session from the list below.', single: 'Single track', paired: 'Linked playback',
    left: 'Left view', right: 'Right view', file: 'Recording file', play: 'Play', pause: 'Pause', pending: 'Loading media…',
    audio: 'Audio source', muted: 'Muted', seek: 'Playback position', fullscreen: 'Full screen', exitFullscreen: 'Exit full screen',
    block: 'Press play again to start.', failed: 'Playback failed. Retry or select another file.',
    retry: 'Reload', auth: 'The source recorder denied access.', missing: 'The file is missing from the source recorder.',
    unavailable: 'The source recorder is unavailable.', codec: 'The browser cannot decode this recording.', buffering: 'Buffering…',
  },
  fr: {
    title: 'Enregistrements', refresh: 'Actualiser', floorA: '3ᵉ étage', floorB: '1ᵉʳ étage', demo: 'Appareil simulé',
    storage: 'Stockage des enregistreurs', used: 'Utilisé', free: 'Disponible', total: 'Capacité', unknown: 'Indisponible',
    online: 'En ligne', offline: 'Hors ligne', error: 'État indisponible', unconfigured: 'Non configuré',
    recording: 'Enregistrement', paused: 'En pause', idle: 'Au repos', at: 'Mis à jour à', refreshFail: 'Chargement impossible. Actualisez pour réessayer.',
    room: 'Salle', all: 'Toutes les salles', from: 'Du', to: 'Au', keyword: 'Rechercher',
    placeholder: 'Cours, enseignant ou fichier', clear: 'Effacer', rangeInvalid: 'La date de fin doit être égale ou postérieure à la date de début.',
    loading: 'Chargement des enregistrements…', stale: 'Résultats antérieurs · appareil indisponible', partial: 'Catalogue incomplet', none: 'Aucun enregistrement pour ces filtres.',
    sessions: 'séances', files: 'fichiers', course: 'Cours', instructor: 'Enseignant', date: 'Date de captation',
    source: 'Source', tracks: 'Fichiers', action: 'Lecture', open: 'Ouvrir', previous: 'Précédent', next: 'Suivant',
    unnamed: 'Non renseigné', player: 'Lecture dans le navigateur', pick: 'Ouvrez une séance dans la liste ci-dessous.', single: 'Une piste', paired: 'Lecture synchronisée',
    left: 'Vue gauche', right: 'Vue droite', file: 'Fichier vidéo', play: 'Lire', pause: 'Pause', pending: 'Chargement de la vidéo…',
    audio: 'Source audio', muted: 'Muet', seek: 'Position de lecture', fullscreen: 'Plein écran', exitFullscreen: 'Quitter le plein écran',
    block: 'Appuyez à nouveau sur Lire.', failed: 'Lecture impossible. Réessayez ou choisissez un autre fichier.',
    retry: 'Recharger', auth: 'L’enregistreur source a refusé l’accès.', missing: 'Fichier introuvable sur l’enregistreur source.',
    unavailable: 'L’enregistreur source est indisponible.', codec: 'Le navigateur ne peut pas décoder cet enregistrement.', buffering: 'Mise en mémoire tampon…',
  },
};

function node(tag, text, className) {
  const result = document.createElement(tag);
  if (text !== undefined) result.textContent = text;
  if (className) result.className = className;
  return result;
}

function field(name, control) {
  const label = node('label', undefined, 'lib-field');
  label.append(node('span', name), control);
  return label;
}

function button(name, handler, className) {
  const result = node('button', name, className);
  result.type = 'button';
  result.addEventListener('click', handler);
  return result;
}

function fillSelect(select, entries, value) {
  select.replaceChildren(...entries.map(([key, label]) => new Option(label, key)));
  select.value = value;
}

function clock(seconds) {
  if (!Number.isFinite(seconds)) return '–:––';
  const value = Math.floor(Math.max(0, seconds));
  const hrs = Math.floor(value / 3600);
  const minutes = Math.floor(value / 60) % 60;
  return (hrs ? hrs + ':' + String(minutes).padStart(2, '0') : minutes) + ':' + String(value % 60).padStart(2, '0');
}

function groups(rows) {
  const map = new Map();
  for (const row of rows) {
    const key = JSON.stringify([row.device_id, row.directory]);
    if (!map.has(key)) map.set(key, { key, head: row, files: [] });
    map.get(key).files.push(row);
  }
  for (const group of map.values()) group.files.sort((a, b) => a.filename.localeCompare(b.filename));
  return [...map.values()];
}

function initialTracks(files) {
  const find = (pattern) => files.find(f => pattern.test(f.filename));
  const content = find(/(?:^|[_ -])Lecture2\.[^.]+$/i) || find(/(?:^|[_ -])Lecture\.[^.]+$/i);
  const teacher = find(/(?:^|[_ -])Teacher_C\.[^.]+$/i);
  const left = content || files[0];
  return { left, right: teacher !== left && teacher || files.find(f => f !== left), pair: !!(content && teacher) };
}

function playbackPanel(panel, session, dictionary, roomName, mode, lang) {
  const d = dictionary;
  const defaults = initialTracks(session.files);
  let pair = defaults.pair;
  let left = defaults.left;
  let right = defaults.right;
  let audio = 'right';
  let disposeTransport = () => {};
  let disposed = false;
  const title = session.head.title === '未标注' ? d.unnamed : session.head.title;
  const choices = session.files.map(file => [file.id, file.filename]);
  const sourceURL = file => '/api/recordings/' + encodeURIComponent(file.id) + '/media?mode=' + mode;
  function draw() {
    disposeTransport();
    const life = new AbortController();
    const signal = life.signal;
    const listen = (el, evt, cb) => el.addEventListener(evt, cb, {signal});
    const top = node('div', undefined, 'lib-player-head');
    const heading = node('div');
    heading.append(node('h3', title), node('div', [roomName(session.head.device_id), session.head.start_time].filter(Boolean).join(' · '), 'lib-sub'));
    const toggle = node('div', undefined, 'lib-segments');
    for (const [name, isPair] of [[d.single, false], [d.paired, true]]) {
      const tab = button(name, () => { if (isPair !== pair) { pair = isPair; draw(); } });
      tab.disabled = isPair && session.files.length < 2;
      tab.setAttribute('aria-pressed', String(pair === isPair));
      toggle.append(tab);
    }
    top.append(heading, toggle);
    const views = node('div', undefined, pair ? 'lib-views lib-linked' : 'lib-views');
    const selections = pair ? [left, right] : [left];
    const videos = selections.map((file, i) => {
      const view = node('div', undefined, 'lib-view');
      const selector = node('select');
      fillSelect(selector, choices, file.id);
      selector.onchange = () => {
        const chosen = session.files.find(f => f.id === selector.value);
        if (i === 0) {
          if (chosen === right) right = left;
          left = chosen;
        } else {
          if (chosen === left) left = right;
          right = chosen;
        }
        draw();
      };
      const frame = node('div', undefined, 'lib-frame');
      const video = node('video');
      video.playsInline = true;
      video.controls = !pair;
      video.preload = 'metadata';
      video.muted = pair && (i === 0 ? audio !== 'left' : audio !== 'right');
      video.setAttribute('aria-label', file.filename);
      video.src = sourceURL(file);
      frame.append(video);
      view.append(field(pair ? (i === 0 ? d.left : d.right) : d.file, selector), frame);
      views.append(view);
      return video;
    });
    const transport = node('div', undefined, 'lib-transport');
    const feedback = node('p', d.pending, 'lib-feedback');
    feedback.setAttribute('role', 'status');
    const mediaBox = node('div', undefined, 'lib-media-box');
    mediaBox.append(views, transport);
    const retry = button(d.retry, draw);
    retry.hidden = true;
    const status = node('div', undefined, 'lib-player-status');
    status.append(feedback, retry);
    panel.replaceChildren(top, mediaBox, status);
    let playing = false, buffering = false, epoch = 0, tick, failed = false;
    const duration = () => Math.min(...videos.map(v => v.duration));
    const playButton = button(d.play, () => playing ? pause() : play(), 'lib-accent');
    const timeline = node('input');
    timeline.type = 'range'; timeline.min = '0'; timeline.max = '1'; timeline.step = '.1'; timeline.value = '0';
    timeline.setAttribute('aria-label', d.seek);
    const time = node('output');
    const pausedState = () => {
      playButton.textContent = playing ? d.pause : d.play;
      playButton.setAttribute('aria-pressed', String(playing));
    };
    function pause() {
      ++epoch;
      playing = false;
      buffering = false;
      videos.forEach(v => v.pause());
      pausedState();
    }
    async function play() {
      if (failed) return;
      const id = ++epoch;
      playing = true;
      buffering = false;
      pausedState();
      if (videos.some(v => v.ended) || videos[0].currentTime >= duration() - 0.05) {
        videos.forEach(v => { v.currentTime = 0; });
      }
      try {
        await Promise.all(videos.map(v => v.play()));
        if (id === epoch) feedback.textContent = '';
      } catch (err) {
        if (id !== epoch || signal.aborted) return;
        pause();
        feedback.textContent = err.name === 'NotAllowedError' ? d.block : d.failed;
      }
    }
    function update() {
      const max = duration();
      const ready = Number.isFinite(max) && max > 0;
      playButton.disabled = failed || !ready;
      timeline.disabled = failed || !ready;
      if (ready) {
        timeline.max = String(max);
        if (!dragging) timeline.value = String(Math.min(videos[0].currentTime, max));
        time.textContent = clock(dragging ? Number(timeline.value) : videos[0].currentTime) + ' / ' + clock(max);
        if (!failed && feedback.textContent === d.pending) feedback.textContent = '';
      }
    }
    let dragging = false, slowSince = 0;
    if (pair) {
      const audioSelect = node('select');
      fillSelect(audioSelect, [['left',d.left],['right',d.right],['none',d.muted]], audio);
      audioSelect.onchange = () => {
        audio = audioSelect.value;
        videos[0].muted = audio !== 'left';
        videos[1].muted = audio !== 'right';
      };
      timeline.oninput = () => { dragging = true; update(); };
      timeline.onchange = () => {
        const goal = Number(timeline.value);
        videos.forEach(v => { v.currentTime = goal; });
        dragging = false; update();
      };
      timeline.onblur = () => { dragging = false; };
      const full = button(d.fullscreen, async () => {
        try {
          if (document.fullscreenElement) await document.exitFullscreen();
          else await mediaBox.requestFullscreen();
        } catch { full.disabled = true; }
      });
      full.hidden = !document.fullscreenEnabled;
      listen(document, 'fullscreenchange', () => {full.textContent = document.fullscreenElement ? d.exitFullscreen : d.fullscreen;});
      transport.append(playButton, timeline, time, field(d.audio, audioSelect), full);
      tick = setInterval(() => {
        update();
        if (!playing || failed || dragging || videos.some(v => v.seeking)) return;
        const master = videos[0], follower = videos[1];
        if (videos.some(v => v.readyState < 3)) {
          if (!slowSince) slowSince = performance.now();
          if (!buffering && performance.now() - slowSince > 750) {
            ++epoch; buffering = true;
            videos.forEach(v => v.pause());
            feedback.textContent = d.buffering;
          }
          return;
        }
        slowSince = 0;
        if (buffering) {
          if (Math.abs(follower.currentTime - master.currentTime) > .20) follower.currentTime = master.currentTime;
          play();
        } else if (!master.paused && !follower.paused && Math.abs(follower.currentTime - master.currentTime) > .35) {
          follower.currentTime = master.currentTime;
        }
      }, 250);
      videos.forEach(v => listen(v, 'ended', () => {
        pause();
        const end = duration();
        if (Number.isFinite(end)) videos.forEach(media => { if (Math.abs(media.currentTime - end) > .05) media.currentTime = end; });
        update();
      }));
    } else {
      transport.hidden = true;
    }
    for (const [index, video] of videos.entries()) {
      listen(video, 'loadedmetadata', update);
      listen(video, 'durationchange', update);
      listen(video, 'error', async () => {
        if (failed || !video.error || signal.aborted) return;
        failed = true; pause(); update(); retry.hidden = false;
        let reason = [3,4].includes(video.error.code) ? d.codec : d.failed;
        try {
          const res = await fetch(sourceURL(selections[index]), {headers: {Range: 'bytes=0-0'}, signal});
          if (res.status === 401 || res.status === 403) reason = d.auth;
          else if (res.status === 404) reason = d.missing;
          else if (res.status >= 500) reason = d.unavailable;
          await res.body?.cancel();
        } catch { if (!signal.aborted) reason = d.unavailable; }
        if (!signal.aborted) feedback.textContent = selections[index].filename + ' · ' + reason;
      });
    }
    if (!pair) {
      const details = '/api/recordings/' + encodeURIComponent(left.id) + '/details?mode=' + mode;
      fetch(details, {signal}).then(r => r.ok ? r.json() : null).then(info => {
        if (info && !failed && !signal.aborted) feedback.textContent = [info.duration, info.resolution, info.code, info.audioCode].filter(Boolean).join(' · ');
      }).catch(() => {});
    }
    update();
    disposeTransport = () => {
      life.abort(); ++epoch; clearInterval(tick);
      if (document.fullscreenElement === mediaBox) document.exitFullscreen().catch(() => {});
      videos.forEach(video => { video.pause(); video.removeAttribute('src'); video.load(); });
    };
  }
  draw();
  return () => { if (!disposed) { disposed = true; disposeTransport(); } };
}

export function initLibrary(root, {mode, lang}) {
  const d = copy[lang] || copy.zh;
  const locale = ({zh:'zh-CN',en:'en',fr:'fr'})[lang] || 'zh-CN';
  const life = new AbortController();
  const container = node('section', undefined, 'lib-workspace');
  const status = node('div', undefined, 'lib-devices');
  status.setAttribute('aria-label', d.storage);
  const player = node('section', undefined, 'lib-panel lib-player');
  player.setAttribute('aria-label', d.player);
  const emptyPlayer = () => player.replaceChildren(node('h3', d.player), node('p', d.pick, 'lib-sub'));
  emptyPlayer();
  const filters = node('form', undefined, 'lib-filters');
  const room = node('select'), from = node('input'), to = node('input'), keyword = node('input');
  const roomName = id => id === 'a' ? d.floorA : d.floorB;
  fillSelect(room, [['',d.all],['a',roomName('a')],['b',roomName('b')]], '');
  from.type = to.type = 'date'; keyword.type = 'search'; keyword.placeholder = d.placeholder; keyword.maxLength = 150;
  filters.append(field(d.room,room), field(d.from,from), field(d.to,to), field(d.keyword,keyword),
    button(d.clear, () => {filters.reset(); filter();}));
  const catalog = node('section', undefined, 'lib-panel lib-catalog');
  const head = node('div', undefined, 'lib-list-head');
  head.append(node('h3', d.title), button(d.refresh, () => {load(true); loadStatus(true);}));
  const live = node('p', '', 'lib-list-state'); live.setAttribute('role','status');
  const tableBox = node('div', undefined, 'lib-tablebox');
  const table = node('table');
  const th = table.createTHead().insertRow();
  [d.course,d.instructor,d.date,d.source,d.tracks,d.action].forEach(text => {
    const cell = node('th', text); cell.scope = 'col'; th.append(cell);
  });
  const body = table.createTBody(); tableBox.append(table);
  const nav = node('nav', undefined, 'lib-pages');
  const prev = button(d.previous, () => {page -= 1; render();});
  const next = button(d.next, () => {page += 1; render();});
  const pageInfo = node('span');
  nav.append(prev, pageInfo, next);
  catalog.append(head, filters, live, tableBox, nav);
  container.append(status, player, catalog);
  root.replaceChildren(container);

  let sessions = [], visible = [], devices = new Map(), summaries = [], page = 0;
  let currentKey = null, releasePlayer = () => {}, queryRun = 0, statusRun = 0, loading = false, loadError = false;
  const pageSize = 10;
  function fileSize(bytes) {
    if (!Number.isFinite(bytes)) return d.unknown;
    const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
    let i = 0, n = bytes;
    while (n >= 1024 && i < units.length-1) {n /= 1024; i++;}
    return n.toLocaleString(locale, {maximumFractionDigits: 1}) + ' ' + units[i];
  }
  const translated = v => v === '未标注' || !v ? d.unnamed : v;
  function storageCard(data) {
    const card = node('article', undefined, 'lib-device');
    const top = node('div', undefined, 'lib-list-head');
    top.append(node('strong',roomName(data.id)), node('span',d[data.connection] || d.unknown, 'lib-state'));
    const rec = ({'录制中':d.recording, '已暂停':d.paused, '空闲':d.idle})[data.recording] || d.unknown;
    const size = value => value == null ? d.unknown : fileSize(value * 1024 * 1024);
    const meta = node('p', [data.model, mode === 'demo' ? d.demo : data.ip, rec].filter(Boolean).join(' · '),'lib-sub');
    const used = node('progress'); used.max = data.total_mb || 1; used.value = data.used_mb || 0;
    used.setAttribute('aria-label',d.used);
    const sizes = node('div', undefined, 'lib-sizes');
    for (const [key,value] of [[d.used,data.used_mb],[d.free,data.free_mb],[d.total,data.total_mb]]) {
      sizes.append(node('span',key + ' ' + size(value)));
    }
    const last = data.updated_at ? new Date(data.updated_at).toLocaleTimeString(locale) : d.unknown;
    card.append(top, meta, used, sizes, node('span',d.at + ' ' + last,'lib-updated'));
    if (data.error) card.title = data.error;
    return card;
  }
  function select(session) {
    currentKey = session.key;
    releasePlayer();
    releasePlayer = playbackPanel(player, session, d, roomName, mode, lang);
    render();
    player.scrollIntoView({block:'nearest'});
  }
  function filter() {
    page = 0;
    const word = keyword.value.trim().toLocaleLowerCase(locale);
    visible = sessions.filter(({head,files}) => {
      const day = head.start_time?.slice(0,10) || '';
      return (!room.value || head.device_id === room.value)
        && (!from.value || day >= from.value)
        && (!to.value || day && day <= to.value)
        && (!word || [head.title, head.teacher, ...files.map(f => f.filename)].some(value => value?.toLocaleLowerCase(locale).includes(word)));
    });
    render();
  }
  function render() {
    const invalid = !!(from.value && to.value && from.value > to.value);
    const warnings = summaries.filter(s => !s.complete && (!room.value || s.device_id === room.value)).map(s =>
      roomName(s.device_id) + ' · ' + (s.stale ? d.stale : d.partial));
    if (loading) warnings.push(d.loading);
    if (loadError) warnings.push(d.refreshFail);
    if (invalid) warnings.push(d.rangeInvalid);
    const count = visible.length + ' ' + d.sessions + ' · ' + visible.reduce((n,s) => n+s.files.length,0) + ' ' + d.files;
    live.textContent = [!loading && !loadError && (visible.length ? count : invalid ? '' : d.none), ...warnings].filter(Boolean).join(' / ');
    live.classList.toggle('lib-warning', !!(invalid || loadError || warnings.length && !loading));
    const pages = Math.ceil(visible.length/pageSize);
    page = Math.min(Math.max(0,page),Math.max(0,pages-1));
    pageInfo.textContent = (page + 1) + ' / ' + pages;
    prev.disabled = page <= 0; next.disabled = page+1 >= pages;
    nav.hidden = pages < 2; tableBox.hidden = !visible.length || invalid;
    body.replaceChildren(...visible.slice(page*pageSize,(page+1)*pageSize).map(session => {
      const {head,files} = session;
      const tr = node('tr');
      tr.classList.toggle('lib-selected', session.key === currentKey);
      const course = node('td'); course.append(node('strong',translated(head.title)));
      const filenames = files.map(f => f.filename).join(' · ');
      const names = node('span',filenames,'lib-filenames'); names.title = filenames; course.append(names);
      const countCell = node('td'); countCell.append(node('strong',String(files.length)),node('span',
        fileSize(files.every(f => Number.isFinite(f.size_bytes)) ? files.reduce((a,f)=>a+f.size_bytes,0) : null),'lib-sub'));
      const show = button(d.open, () => select(session));
      show.setAttribute('aria-label',[d.open,roomName(head.device_id),head.start_time,translated(head.title)].join(' · '));
      const state = devices.get(head.device_id);
      show.disabled = summaries.some(s => s.device_id === head.device_id && s.stale)
        || !!state && state.connection !== 'online';
      const action = node('td'); action.append(show);
      tr.append(course,node('td',translated(head.teacher)),node('td',head.start_time || d.unknown),
        node('td',roomName(head.device_id)),countCell,action);
      return tr;
    }));
  }
  async function data(path, force) {
    const params = new URLSearchParams({mode, refresh:String(force)});
    const response = await fetch('/api/' + path + '?' + params, {signal:life.signal});
    if (!response.ok) throw new Error(response.status);
    return response.json();
  }
  async function load(force = false) {
    const run = ++queryRun;
    loading = true; loadError = false; render();
    try {
      const {recordings,devices:summary} = await data('recordings',force);
      if (run !== queryRun || life.signal.aborted) return;
      sessions = groups(recordings); summaries = summary;
      if (currentKey && !sessions.some(s => s.key === currentKey)) {
        releasePlayer(); releasePlayer = () => {}; currentKey = null; emptyPlayer();
      }
      loading = false; filter();
    } catch {
      if (run !== queryRun || life.signal.aborted) return;
      loadError = true; loading = false; sessions = []; summaries = []; filter();
    }
  }
  async function loadStatus(force = false) {
    const run = ++statusRun;
    try {
      const result = await data('devices',force);
      if (run !== statusRun || life.signal.aborted) return;
      devices = new Map(result.devices.map(dev => [dev.id,dev]));
      status.replaceChildren(...result.devices.map(storageCard)); render();
    } catch {
      if (run === statusRun && !life.signal.aborted) status.replaceChildren(node('p',d.refreshFail,'lib-warning'));
    }
  }
  filters.oninput = filter;
  filters.onsubmit = ev => {ev.preventDefault(); filter();};
  load(); loadStatus();
  const timer = setInterval(loadStatus,10000);
  return () => { life.abort(); clearInterval(timer); releasePlayer(); container.remove(); };
}
