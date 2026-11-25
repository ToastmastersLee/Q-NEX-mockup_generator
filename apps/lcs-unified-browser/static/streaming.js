const labels = {
  room:['直播间','Streaming room','Salle de diffusion'], source:['录播来源','Recorder source','Source vidéo'],
  dest:['接收设备','Receivers','Récepteurs'],volume:['分发音量 (%)','Distribution volume (%)','Volume de diffusion (%)'],
  existing:['使用直播间当前流','Use the current room feed','Utiliser le flux actuel'],
  film:['PGM 节目','PGM program','Programme PGM'],teacher:['教师特写','Instructor close-up','Gros plan enseignant'],
  start:['推送到所选设备','Stream to selected receivers','Diffuser vers la sélection'],
  stop:['结束本次分发','End this distribution','Terminer cette diffusion'],
  inspect:['查看分发状态','Check distribution','Vérifier la diffusion'],
  pending:['正在联系 Q-NEX…','Contacting Q-NEX…','Connexion à Q-NEX…'],
  active:['正在分发','Distributing','Diffusion en cours'],idle:['尚未分发','Idle','Aucune diffusion en cours'],
  started:['平台已确认分发','Distribution confirmed','Diffusion confirmée'],
  stopped:['本次分发已结束','Distribution ended','Diffusion terminée'],demo:['模拟','Simulation','Simulation'],
  login:['请在此页登录 Q-NEX。','Sign in to Q-NEX here.','Connectez-vous à Q-NEX ici.'],
  user:['Q-NEX 账号','Q-NEX account','Compte Q-NEX'],password:['密码','Password','Mot de passe'],
  code:['验证码','Verification code','Code de vérification'],signin:['登录并继续','Sign in and continue','Connexion et suite'],
  challenge:['Q-NEX 要求图形验证。','Q-NEX requires image verification.','Q-NEX exige un code visuel.'],
  external:['直播间正在分发，已有场次受保护。','An existing distribution is active.','Une diffusion est déjà en cours.'],
  occupied:['该房间已有源，请选择「使用直播间当前流」或换一个空闲房间。','This room already has a feed. Use it or choose an idle room.','Utilisez le flux actuel ou sélectionnez une salle libre.'],
  config:['该楼层尚未配置录播 IP。','Recorder IP missing.','Adresse IP manquante.'],
  ffmpeg:['本机需要 FFmpeg 和 ffprobe。','FFmpeg and ffprobe are required.','FFmpeg et ffprobe sont requis.'],
  input:['录播取流或 RTMP 发布失败，请检查所选录播通道。','Could not relay the recorder channel.','Impossible de relayer le canal.'],
  recorder:['录播未响应通道查询或启停请求。','Recorder channel request failed.','La commande du canal a échoué.'],
  sourceAudio:['该录播通道已关闭直播音频。','Audio is disabled on the recording channel.','Audio désactivé sur le canal.'],
  sourceRoute:['该录播通道指向另一服务器，且没有可用的本地源。请核对该通道的 RTSP 直播或推流地址。','Check this channel’s local RTSP feed or publishing destination.','Vérifiez le flux RTSP local ou la destination de ce canal.'],
  sourceUnavailable:['录播通道已请求开启，但其本机 RTMP 尚未读到音视频。','No audio/video on the recorder RTMP output.','Flux audio et vidéo local indisponible.'],
  publishFailed:['直播间 RTMP 未收到可读的音视频，请检查录播源及至房间的推流。','No readable audio/video returned from the room RTMP.','Aucun flux audio et vidéo reçu dans la salle.'],
  empty:['该房间没有可回放的媒体流。','The room has no playable feed.','Aucun flux disponible.'],
  media:['无法连接或读取直播间 RTMP。','Cannot read the room’s RTMP stream.','Flux RTMP inaccessible.'],
  targets:['所选接收设备离线、重名或不可控。','Receiver offline, ambiguous or unavailable.','Récepteur indisponible ou ambigu.'],
  busy:['另一项操作正在执行，请稍后重试。','Another action is in progress.','Une action est déjà en cours.'],
  unconfirmed:['请求结果待核对，请点「查看分发状态」。','Check distribution to confirm the outcome.','Vérifiez l’état de la diffusion.'],
  gateway:['Q-NEX 接口连接或响应异常。','Q-NEX gateway or response unavailable.','Réponse Q-NEX indisponible.'],
  platform:['Q-NEX 返回错误码','Q-NEX returned error','Code d’erreur Q-NEX'],
  badRoom:['直播间名称或入口已变化。','Room identity or address changed.','Nom ou adresse de la salle modifiés.']
};
const simulation = new Map();
export function mountStreaming(root,{mode,lang,t,local}) {
  const tr = key => labels[key][{zh:0,en:1,fr:2}[lang] ?? 1];
  const section = document.createElement('section');
  section.className='surface stream-panel';
  section.innerHTML=`<h1>${t('streaming')}</h1>
    <div class="stream-fields"><label>${tr('room')}<select name="room"><option>Lee</option><option>Codex</option></select></label>
    <label>${tr('source')}<select name="source"></select></label>
    <label>${tr('dest')}<select name="dest"><option value="solo">LQ Test · NMP211</option>
    <option value="both">LQ Test + 1F NDP600</option></select></label>
    <label>${tr('volume')}<input name="volume" type="number" min="0" max="100" value="30" required></label></div>
    <div class="stream-actions"><button data-cmd="start" class="primary">${tr('start')}</button>
    <button data-cmd="inspect">${tr('inspect')}</button><button data-cmd="stop" hidden>${tr('stop')}</button></div>
    <form hidden><div class="stream-fields">
    <label>${tr('user')}<input name="username" autocomplete="username" required></label>
    <label>${tr('password')}<input name="password" type="password" autocomplete="current-password" required></label>
    <label hidden data-code><img alt=""><span>${tr('code')}</span><input name="code" autocomplete="off"></label></div>
    <button>${tr('signin')}</button></form><p role="status" aria-live="polite"></p>`;
  root.replaceChildren(section);
  const el = name => section.querySelector('[name="'+name+'"]');
  const room=el('room'), source=el('source'), dest=el('dest'), volume=el('volume');
  const form=section.querySelector('form'), challenge=form.querySelector('[data-code]');
  const buttons=[...section.querySelectorAll('[data-cmd]')], status=section.querySelector('[role=status]');
  for(const floor of ['b','a'])for(const channel of ['film','teacher'])
    source.add(new Option(t(floor)+' · '+tr(channel),floor+'/'+channel));
  source.add(new Option(tr('existing'),'b/existing'));
  let pending=false, active=false, resume='inspect';
  function controls(){
    for(const btn of buttons)btn.disabled=!local||pending||(active&&btn.dataset.cmd==='start');
    room.disabled=!local||pending;
    source.disabled=dest.disabled=volume.disabled=!local||pending||active;
    form.querySelector('button').disabled=pending;
  }
  async function post(path,body){
    const res=await fetch('/api/classroom/streaming'+path+'?mode=live',{method:'POST',
      headers:{'Content-Type':'application/json','X-Requested-With':'IQVideo'},body:JSON.stringify(body)});
    const data=await res.json();
    if(!res.ok)throw Error(typeof data.detail==='string'?data.detail:'gateway');
    return data;
  }
  function error(e){
    const key=e.message;
    if(key==='login')form.hidden=false;
    status.textContent=key.startsWith('platform:')?tr('platform')+' '+key.slice(9):
      tr(key==='room'?'badRoom':labels[key]?key:'gateway');
  }
  async function run(action){
    if(pending||!local||action==='start'&&!volume.reportValidity())return;
    pending=true;resume=action;controls();status.textContent=tr('pending');
    const [floor,channel]=source.value.split('/');
    try{
      let data;
      if(mode==='demo'){
        if(action==='start')simulation.set(room.value,dest.value==='both'?['LQ Test','1F NDP600']:['LQ Test']);
        if(action==='stop')simulation.delete(room.value);
        const targets=simulation.get(room.value)||[];
        data={state:targets.length?(action==='start'?'started':'active'):(action==='stop'?'stopped':'idle'),targets,owned:!!targets.length};
      }else{
        data=await post('',{action,room:room.value,floor,channel,target:dest.value,volume:Number(volume.value)});
      }
      form.hidden=true;active=['active','started'].includes(data.state);
      section.querySelector('[data-cmd=stop]').hidden=!data.owned;
      status.textContent=[mode==='demo'?tr('demo'):'',room.value,tr(data.state),active?data.targets.join(' + '):''].filter(Boolean).join(' · ');
    }catch(e){error(e);}finally{pending=false;controls();}
  }
  form.onsubmit=async event=>{
    event.preventDefault();if(pending)return;
    pending=true;controls();
    try{
      const data=await post('/login',{username:el('username').value,password:el('password').value,code:el('code').value});
      if(data.state==='challenge'){
        challenge.hidden=false;challenge.querySelector('img').src=data.image;el('code').required=true;
        status.textContent=tr('challenge');el('code').focus();return;
      }
      form.reset();form.hidden=true;challenge.hidden=true;el('code').required=false;
    }catch(e){error(e);return;}finally{pending=false;controls();}
    await run(resume);
  };
  room.onchange=()=>{active=false;section.querySelector('[data-cmd=stop]').hidden=true;void run('inspect');};
  for(const btn of buttons)btn.onclick=()=>run(btn.dataset.cmd);
  controls();if(local)void run('inspect');
  return ()=>{form.onsubmit=room.onchange=null;for(const btn of buttons)btn.onclick=null;};
}
