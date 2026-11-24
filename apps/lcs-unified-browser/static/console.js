import {translator,languages} from './console-i18n.js';
import {initialMode, clearDemoLink} from './mode.js';
import {mountMonitor} from './monitor.js';
import {initLibrary} from './library.js';

const $ = selector => document.querySelector(selector);
const roomIds = ['a','b'];
const defaults = ['film','computer','computer2','teacher','student','teacher_full','student_full','interactive'];
const opposite = room => room === 'a' ? 'b' : 'a';
const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const esc = escape;
function saved(key,fallback){try{return localStorage.getItem('iqdesk.'+key)??fallback;}catch{return fallback;}}
function save(key,value){try{localStorage.setItem('iqdesk.'+key,value);}catch{/* Storage is optional. */}}
const params=new URLSearchParams(location.search);
let lang=languages.includes(params.get('lang'))?params.get('lang'):saved('language','zh');
if(!languages.includes(lang))lang='zh';
let t=translator(lang);
let mode=initialMode();
let tab=['control','settings','library'].includes(location.hash.slice(1))?location.hash.slice(1):'control';
let snapshot=null, host='a', initialHost=true, busy=false, epoch=0, requestSerial=0, request=null, polling=false;
let cleanupLibrary=null, libraryVariant='', message=null;
const monitors=new Map(), observations=new Map(), drafts={demo:{a:{},b:{}},live:{a:{},b:{}}};
const view={a:'pgm',b:'pgm'};
const powerRequests=new Set();
let journal=[], testExpanded=false, logExpanded=false;
const disabled=condition=>condition?' disabled':'';
const press=flag=>' aria-pressed="'+Boolean(flag)+'"';
const selected=value=>value?' selected':'';
const room=id=>snapshot?.rooms?.find(r=>r.id===id) || {id,online:false};
const actualHost=()=>roomIds.includes(snapshot?.host)?snapshot.host:null;
const clock=stamp=>{const d=new Date(stamp);return Number.isNaN(+d)?'—':d.toLocaleTimeString(lang,{hour12:false});};
function channelLabel(r,id){
  if(!Number.isInteger(id))return t('unavailable');
  const entry=r.channels?.find(c=>c.id===id);
  return entry?t(entry.key):t(defaults[id]||'ch')+(defaults[id]?'':' '+id);
}
function sourceOptions(r,includeFilm=true){
  return (r.channels || []).filter(c=>c.key!=='interactive' && (includeFilm||c.key!=='film')).map(c=>[c.id,t(c.key)]);
}
function keyName(k){return t(({speaker:'speakerFull'})[k]||k);}
function settingOpts(key,r){
  if(['dual','local','speaker'].includes(key)) return [[0,t('off')],[1,t('on')]];
  if(key==='mics')return [0,1,2,3,4].map(i=>[i,String(i)]);
  if(key==='split')return [[4,'4'],[9,'9']];
  if(key.startsWith('quality'))return [['sd','SD'],['hd','HD'],['fhd','FHD · 2 Mbps'],['fhd4','FHD · 4 Mbps'],['fhd8','FHD · 8 Mbps']];
  return sourceOptions(r,key!=='send2');
}
const optionList=(options,current)=>options.map(([value,text])=>`<option value="${esc(value)}"${selected(String(current)===String(value))}>${esc(text)}</option>`).join('');
function select(name,attrs,options,value,off=false){
  if(!options.some(([v])=>String(v)===String(value)))options=[['',t('unknown')],...options];
  return `<select aria-label="${esc(name)}" ${attrs} data-current="${esc(value??'')}"${disabled(off)}>${optionList(options,value??'')}</select>`;
}
function button(action,label,off=false,attrs='',cls=''){
  return `<button type="button" data-action="${action}" class="${cls}" ${attrs}${disabled(off)}>${esc(label)}</button>`;
}
const statePill=(label,tone='neutral')=>`<span class="state-pill ${tone}"><i aria-hidden="true"></i>${esc(label)}</span>`;
const caption=(label,body)=>`<div class="desk-section-head"><h2>${esc(label)}</h2>${body||''}</div>`;
function baseHTML(){
  $('#product').textContent=t('product');
  document.title='IQVideo · '+t('product'); document.documentElement.lang=lang==='zh'?'zh-CN':lang;
  $('#language').value=lang;
  $('#modes').setAttribute('aria-label',t('mode'));
  $('#modes').innerHTML=['live','demo'].map(m=>button('mode',t(m),busy,'data-value="'+m+'"'+press(m===mode))).join('');
  $('#tabs').innerHTML=['control','settings','library'].map(k=>button('tab',t(k),false,'data-value="'+k+'" '+(k===tab?'aria-current="page"':''))).join('');
  $('#cancel').textContent=t('cancel');$('#commit').textContent=t('continue');
}
function localControl(){
  return mode==='demo'||['localhost','127.0.0.1','[::1]'].includes(location.hostname);
}
function sessionBar(){
  const current=actualHost(), complete=!!snapshot?.sameClass;
  const any=snapshot?.rooms?.some(r=>r.inMeeting);
  const hostDiff=current && current!==host;
  const locked=busy||!localControl()||!snapshot;
  const canStart=room(host).online && room(opposite(host)).online;
  const info=any ? (complete?'active':'partial') : roomIds.every(id=>room(id).online)?'noClass':'unknown';
  return `<section class="session surface" data-key="session">
    <div class="session-id"><div class="session-icon" aria-hidden="true">◫</div><div><h1>${t('classroom')}</h1><p>${statePill(snapshot?t(info):t('updating'),complete?'green':(any?'amber':'neutral'))}</p></div></div>
    <div class="session-choices"><div class="session-label">${t('preferred')}</div>
    <div class="segments">${roomIds.map(id=>button('host',t(id),locked,'data-room="'+id+'"'+press(id===host))).join('')}</div></div>
    <div class="session-actions">
    ${button('start',t(hostDiff?'switchHost':'start'),locked||!canStart||(!hostDiff&&current===host), '', 'primary')}
    ${button('rejoin',t('reconnect'),locked||!current||complete||!room(opposite(current)).online)}
    ${button('end',t('end'),locked||!any,'','quiet-danger')}</div>
    ${mode==='live'&&!complete?`<p class="session-hint">${t('autoRecordHint')}</p>`:''}
  </section>`;
}
function videoBox(id,kind,src,ready,hint){
  const ch=kind==='interactive'?(room(id).channels||[]).find(c=>c.key==='interactive')?.id??7:kind==='pgm'?0:src;
  const guest=room(opposite(id));
  const granted=actualHost()===id && snapshot?.sameClass && guest.speak===1;
  const speaker=kind==='interactive'&&granted?t('speaking')+' · '+(guest.name||t(guest.id)):'';
  const label=[t(id),kind.startsWith('out')?kind.toUpperCase():t(kind),speaker].filter(Boolean).join(' · ');
  return `<div class="media-box" data-key="box-${id}-${kind}" data-frame-title="${esc(label)}">${ready?
    `<div class="monitor-mount" data-monitor="${id}-${kind}" data-kind="${kind}" data-room="${id}" data-channel="${esc(ch)}"></div>`:
    `<div class="monitor-placeholder"><span class="standby-icon" aria-hidden="true"></span><span>${esc(hint)}</span></div>`}${ready&&speaker?`<span class="speaker-flag">${esc(speaker)}</span>`:''}${ready?`<button type="button" class="expand-feed" data-action="expand" aria-label="${esc(t('expand')+' · '+label)}" title="${esc(t('expand'))}">⛶</button>`:''}</div>`;
}
function outputCard(port,from,to){
  const tx=room(from), rx=room(to);
  const out=(rx.outputs||[]).find(o=>o.port===port);
  const current=out?.channel;
  const ready=rx.online && snapshot?.sameClass && out?.mapped && out.source===from;
  const options=sourceOptions(tx,out?.stream===0);
  const canChange=localControl()&&!busy&&ready&&tx.online&&rx.online;
  return `<article class="out-card" data-key="out${port}">
   <div class="tile-heading"><span class="port">OUT${port}</span><b>${t(to==='b'?(port===1?'left':'right'):'wiringPending')}</b><span class="light-note">${t(to)}</span></div>
   ${videoBox(to,'out'+port,current,ready,t(!snapshot?.sameClass?'beforeMeeting':'notMapped'))}
   <label class="source-control"><span>${t('source')}</span>${select(t(to)+' '+(to==='b'?t('port'+port):'OUT'+port)+' · '+t('source'),'data-field="route" data-room="'+to+'" data-port="'+port+'"',options,current,!canChange)}</label>
   <p class="tile-status">${statePill(ready?t(mode==='demo'?'simulated':'assigned'):t('notMapped'),'neutral')}
   <span>${ready?esc(t(from)+' · '+channelLabel(tx,current)):'—'}</span></p></article>`;
}
function monitorCard(id){
  const r=room(id),kind=view[id];
  return `<article class="room-monitor" data-key="room-${id}"><div class="tile-heading"><b>${t(id)}</b>${statePill(t(r.online?r.role||'idle':'offline'),r.inMeeting?'green':'neutral')}</div>
  ${videoBox(id,kind,null,r.online,t('offline'))}
  <div class="segments source-tabs">${['pgm','interactive'].map(v=>button('view',t(v),false,'data-room="'+id+'" data-value="'+v+'"'+press(v===kind))).join('')}</div></article>`;
}
function recordState(r){
  if(!r.online||r.record==null)return 'unknown';
  return r.record===2?'paused':r.record===0?'notRecording':'recording';
}
function roomActions(id){
  const r=room(id),locked=!localControl()||busy||!r.online, micKnown=[0,1].includes(r.mute),floorKnown=[0,1].includes(r.speak);
  const powerState=powerRequests.has(id)?'powerSending':r.powerState;
  const classMic=locked||!snapshot?.sameClass, tutor=r.role==='host', active=r.record===1||r.record===3, paused=r.record===2;
  return `<article class="desk-room" data-key="actions-${id}">
   <div class="room-title"><div><h3>${t(id)}</h3><span class="room-sub">${esc(r.name || r.model || t('unknown'))}</span></div>${statePill(t(r.online?'online':'offline'),r.online?'green':'neutral')}</div>
   ${mode==='live'&&!r.online?`<div class="control-line"><small role="status">${t(powerState||'powerHint')}</small>${button('powerOn',t(id)+' · '+t(powerState?'powerPending':'powerOn'),!!powerState||!localControl()||!snapshot||r.error==='unconfigured','data-room="'+id+'"')}</div>`:''}
   <div class="control-line"><div><b>${t('audio')}</b><small>${micKnown?t(r.mute?'muted':'unmuted'):t('unknown')}</small></div>${button('mute',t(r.mute?'unmute':'mute'),classMic||!micKnown||r.speak===1,'data-room="'+id+'" data-value="'+(r.mute?0:1)+'"')}</div>
   <div class="control-line"><div><b>${t('speaker')}</b><small>${floorKnown?t(r.speak?'speaking':'notSpeaking'):t('unknown')}</small></div>${button('speak',t(r.speak?'unspeak':'speak'),classMic||!floorKnown||tutor,'data-room="'+id+'" data-value="'+(r.speak?0:1)+'"')}</div>
   <div class="control-line"><div><b>${t('recorder')}</b><small>${t(recordState(r))}</small></div><div class="row-buttons">${active||paused?
     button('record',t(paused?'recordResume':'recordPause'),locked,'data-room="'+id+'" data-value="'+(paused?3:2)+'"')+button('record',t('recordStop'),locked,'data-room="'+id+'" data-value="0"','quiet-danger'):
     button('record',t('recordStart'),locked||r.record!==0,'data-room="'+id+'" data-value="1"')}</div></div>
   </article>`;
}
function testPanel(){
  const hostId=actualHost()||host, listener=opposite(hostId), account=room(listener).name;
  const full=room(hostId).settings?.speaker;
  return `<details class="surface detail-panel" data-detail="test"${testExpanded?' open':''}>
  <summary>${t('tests')}</summary><div class="inside"><p class="helper">${t('testsDesc')}</p>
  <p class="test-config">${t(hostId)} · ${t('speakerFull')} · ${t(full==null?'unknown':full?'on':'off')}</p><div class="test-grid">${['manual','voice'].map(type=>{
  const key=[mode,hostId,type].join(':');const record=observations.get(key);
  return `<section><h3>${t(type+'Test')}</h3><p>${t(type+'Help')}</p>
    <span class="meta">${t('observeAt')} · ${t(hostId)} ← ${esc(account||t(listener))}</span>
    <label class="source-control"><span>${t('observation')}</span>${select(t(type+'Test'),'data-field="observation" data-type="'+type+'"',[['',t('untested')],...['observed','unchanged','inconclusive'].map(k=>[k,t(k)])],record?.value||'')}</label>
    <small>${record?esc(clock(record.time)):''}</small></section>`;
  }).join('')}</div></div></details>`;
}
function stepName(key){
  if(translatedErrors[key])return translatedErrors[key][languages.indexOf(lang)];
  const aliases={start:'startStep',end:'end',leave:'stop',config:'save',apply:'apply',readback:'verify',rejoin:'reconnect',member:'member',host:'host',guest:'guest',route:'route',prepare:'check'};
  const val=t(aliases[key]||key);
  return val===key && !aliases[key]?key.replaceAll('_',' '):val;
}
function logPanel(){
  const steps=journal.length?journal:snapshot?.steps||[];
  return `<details class="surface detail-panel" data-detail="log"${logExpanded?' open':''}><summary>${t('stepTitle')}</summary><div class="inside"><ol class="step-list">${steps.map(s=>`<li><span class="step-icon ${s.ok===false?'fail':''}">${s.ok===false?'×':'✓'}</span>${esc(stepName(s.key||''))} ${s.room?' · '+esc(t(s.room)):''}</li>`).join('')||'<li>'+t('noSteps')+'</li>'}</ol></div></details>`;
}
function deskView(){
  const from=actualHost()||host,to=opposite(from);
  return sessionBar()+`<section class="surface section-space">
   ${caption(t('routeTitle'),`<span class="room-link">${t(from)} <span aria-label="${t('sender')}">→</span> ${t(to)}</span>`)}
   <div class="out-grid">${[1,2].map(i=>outputCard(i,from,to)).join('')}</div>
   <p class="section-foot">${t('receiverNote')} <strong>${t(to==='b'?'validated':'unvalidated')}</strong></p></section>
   <section class="surface section-space">${caption(t('sources'))}<div class="out-grid">${roomIds.map(monitorCard).join('')}</div></section>
   <section class="surface section-space">${caption(t('roomActions'))}<div class="out-grid paired-actions">${roomIds.map(roomActions).join('')}</div></section>
   ${testPanel()}${logPanel()}`;
}
function fieldControl(r,key){
  const dirty=Object.hasOwn(drafts[mode][r.id],key);
  const current=dirty?drafts[mode][r.id][key]:r.settings?.[key];
  return `<label class="setting-field${dirty?' dirty':''}"><span>${esc(keyName(key))}${dirty?`<small>${t('draft')}</small>`:''}</span>${select(keyName(key),'data-field="setting" data-room="'+r.id+'" data-key="'+key+'"',settingOpts(key,r),current,busy||!r.online||!r.settings||!localControl())}</label>`;
}
function roomSettings(id){
  const r=room(id);
  const formats=['send1','quality1','send2','quality2','returnSource','qualityReturn'];
  return `<section class="surface config-room" data-key="config-${id}">${caption(t(id),statePill(t(r.online?'online':'offline'),r.online?'green':'neutral'))}
   ${r.settings?`<div class="cfg-body"><h3>${t('behavior')}</h3><div class="field-grid">${['dual','mics','speaker','local','split'].map(k=>fieldControl(r,k)).join('')}</div><h3>${t('defaults')}</h3><div class="field-grid">${formats.map(k=>fieldControl(r,k)).join('')}</div></div>`:`<p class="helper">${t('noSettings')}</p>`}
  </section>`;
}
function draftSummary(){
  const entries=[];
  for(const id of roomIds){
    for(const [key,value] of Object.entries(drafts[mode][id])){
      const opts=settingOpts(key,room(id));
      const display=v=>opts.find(([val])=>String(val)===String(v))?.[1] ?? '—';
      entries.push(t(id)+' · '+keyName(key)+'　'+display(room(id).settings?.[key])+' → '+display(value));
    }
  }
  return entries;
}
function settingsView(){
  const entries=draftSummary();
  return `<div class="view-title"><div><h1>${t('settings')}</h1><p>${t('prefsHelp')}</p></div></div>
   <div class="out-grid settings-grid">${roomIds.map(roomSettings).join('')}</div>
   <section class="surface staging">${caption(t('stagedTitle'),`<span class="light-note">${entries.length} ${t('changes')}</span>`)}
   <ul>${entries.map(i=>'<li>'+esc(i)+'</li>').join('')||'<li>'+t('stagedEmpty')+'</li>'}</ul>
   <div class="staging-actions"><label>${t('preferred')} ${select(t('preferred'),'data-field="host"',roomIds.map(id=>[id,t(id)]),host,busy)}</label>
   ${button('discard',t('discard'),busy||!entries.length)}${button('apply',t(actualHost()?'apply':'applyNew'),busy||!entries.length||!localControl()||!!roomIds.find(id=>!room(id).online),'','primary')}</div>
   </section>${logPanel()}`;
}

// Keep media elements, select focus and native menus alive while device state refreshes.
function syncNode(old,next){
  if(old.nodeType!==next.nodeType || old.nodeName!==next.nodeName ||
     (old.nodeType===1 && old.dataset.key!==next.dataset.key)){
    old.replaceWith(next.cloneNode(true)); return;
  }
  if(next.nodeType!==1){if(old.nodeValue!==next.nodeValue)old.nodeValue=next.nodeValue;return;}
  for(const attr of [...old.attributes])if(!next.hasAttribute(attr.name))old.removeAttribute(attr.name);
  for(const attr of next.attributes)if(old.getAttribute(attr.name)!==attr.value)old.setAttribute(attr.name,attr.value);
  if(next.hasAttribute('data-monitor'))return;
  let i=0;
  for(const child of [...next.childNodes]){
    const cur=old.childNodes[i++];
    if(cur)syncNode(cur,child);else old.append(child.cloneNode(true));
  }
  while(old.childNodes.length>i)old.lastChild.remove();
  if(old.tagName==='SELECT' && old.hasAttribute('data-current') && old.value!==old.dataset.current)old.value=old.dataset.current;
}
function clearMonitors(){
  for(const item of monitors.values())item.stop();monitors.clear();
}
function updateMonitors(){
  const current=new Set();
  for(const box of document.querySelectorAll('[data-monitor]')){
    const {room:id,kind}=box.dataset;
    const key=box.dataset.monitor;
    const ch=Number(box.dataset.channel);
    const identity=[mode,lang,id,room(id).ip,kind,ch].join(':');
    const prior=monitors.get(key);
    current.add(key);
    if(prior?.identity===identity && prior.box===box)continue;
    prior?.stop();
    try{
      const sample=(kind==='pgm'||kind==='interactive')?(id==='a'?'a':'b'):([1,2].includes(ch)?'a':'b');
      const stop=mountMonitor(box,{room:id,ip:room(id).ip,kind,mode,lang,channel:ch,source:'/static/sample-'+sample+'.mp4',label:t(id)+' · '+(kind.startsWith('out')?kind.toUpperCase():t(kind))});
      monitors.set(key,{box,identity,stop:typeof stop==='function'?stop:()=>{}});
    }catch{
      box.textContent=t('unavailable');
    }
  }
  for(const [key,item] of monitors){
    if(!current.has(key)){item.stop();monitors.delete(key);}
  }
}
function setNote(note){
  message=note;showNote();
}
function showNote(){
  const el=$('#notice');
  const lines=[!localControl()?t('readOnly'):''];
  if(message)lines.push((message.key?t(message.key):message.text) || t('failed'));
  el.textContent=lines.filter(Boolean).join(' · ');
  el.className='notice '+(message?.tone||'');
  el.hidden=!el.textContent;
}
function render(){
  const stamp=snapshot?.updated;
  $('#last-update').textContent=t(mode==='demo'?'demoMode':'liveMode')+(stamp?' · '+t('updated')+' '+clock(stamp):'');
  showNote();
  if(tab==='library'){
    clearMonitors();
    if(libraryVariant!==mode+lang || !cleanupLibrary){
      cleanupLibrary?.();$('#page').replaceChildren();
      cleanupLibrary=initLibrary($('#page'),{mode,lang,t})||(()=>{});
      libraryVariant=mode+lang;
    }
    return;
  }
  if(cleanupLibrary){cleanupLibrary();cleanupLibrary=null;libraryVariant='';$('#page').replaceChildren();}
  const temp=document.createElement('div');
  temp.id='page';temp.innerHTML=tab==='control'?deskView():settingsView();
  syncNode($('#page'),temp);updateMonitors();
}
function rebuild(){
  baseHTML();render();
}
function receive(data){
  if(!Array.isArray(data?.rooms))throw Error(t('offlineNotice'));
  snapshot=data;
  if(initialHost && actualHost()){host=actualHost();initialHost=false;}
}
async function refresh(){
  if(polling||busy)return;
  polling=true;
  const seq=++requestSerial, stamp=epoch, controller=new AbortController();request=controller;
  const timer=setTimeout(()=>controller.abort(),10000);
  try{
    const res=await fetch('/api/classroom?mode='+mode,{signal:controller.signal,cache:'no-store'});
    if(!res.ok)throw Error(t('offlineNotice'));
    const data=await res.json();
    if(stamp!==epoch||seq!==requestSerial||busy)return;
    receive(data);
    if(message?.source==='poll')message=null;
    render();
  }catch{
    if(stamp===epoch&&seq===requestSerial&&!busy){
      snapshot=null;setNote({key:'offlineNotice',tone:'error',source:'poll'});render();
    }
  }finally{
    clearTimeout(timer);
    if(request===controller){request=null;polling=false;}
  }
}
function switchMode(value){
  if(!['live','demo'].includes(value)||value===mode||busy)return;
  clearDemoLink(value);
  request?.abort();request=null;polling=false;epoch++;initialHost=true;host='a';snapshot=null;
  journal=[];message=null;mode=value;clearMonitors();rebuild();refresh();
}
function setTab(value,updateHash=true){
  if(!['control','settings','library'].includes(value)||value===tab)return;
  if(updateHash)history.replaceState(null,'','#'+value);
  clearMonitors();tab=value;rebuild();
}
function confirmAction(title,body){
  const dialog=$('#confirmation');
  if(dialog.open)return Promise.resolve(false);
  $('#confirm-title').textContent=title;$('#confirm-body').textContent=body;
  $('#commit').textContent=t('continue');$('#cancel').textContent=t('cancel');
  dialog.returnValue='';dialog.showModal();$('#cancel').focus();
  return new Promise(resolve=>dialog.addEventListener('close',()=>resolve(dialog.returnValue==='commit'),{once:true}));
}
function impact(){
  const list=roomIds.filter(id=>[1,2,3].includes(room(id).record));
  const unknown=roomIds.some(id=>!room(id).online||room(id).record==null);
  return [list.length?t('recImpact',{rooms:list.map(tRoom=>t(tRoom)).join(' / ')}):!unknown?t('noRecImpact'):'',unknown?t('unknownRecImpact'):''].filter(Boolean).join(' ');
}
const translatedErrors={
 powerUnconfirmed:['未收到开机回执，请核对待机供电和控制端口。','No power-on acknowledgement. Check standby power and connectivity.','Aucun accusé de réception. Vérifiez la veille et la connexion.'],
 alreadyOnline:['设备已在线。','Device already online.','Appareil déjà en ligne.'],
 playbackBusy:['请在对应录播退出文件回放或释放占用，然后点「听课端重新加入」。','Exit file playback or release the occupied device, then select Rejoin listener.','Quittez la lecture locale ou libérez l’appareil, puis reconnectez la classe distante.'],
 anotherClass:['设备正在另一堂课中，请先核对课堂。','A device is in another class. Check the current session.','Un appareil participe à une autre classe. Vérifiez la session.'],
 noClass:['请先建立双机互动课堂。','Start a class with both rooms first.','Démarrez d’abord une classe avec les deux salles.'],
 restartRequired:['此操作需结束当前课堂并重新开课。','This change requires restarting the class.','Cette modification nécessite de relancer la classe.'],
 verifySettings:['设备回读的设置尚未与目标一致。','Settings readback did not match the request.','Les paramètres relus diffèrent de la demande.'],
 verifyRoute:['设备尚未确认目标通道。','Device has not confirmed the selected source.','L’appareil n’a pas confirmé la source.'],
 verifyMember:['设备尚未确认发言或麦克风状态。','Device has not confirmed the participant audio state.','L’appareil n’a pas confirmé l’état audio du participant.'],
 verifyRecord:['设备尚未确认录制状态。','Device has not confirmed the recording state.','L’appareil n’a pas confirmé l’état d’enregistrement.'],
 recordState:['录制状态已变化，请核对后重试。','Recording state changed. Review it before retrying.','L’état d’enregistrement a changé. Vérifiez-le avant de réessayer.'],
 invalidTarget:['当前教室角色不接受此操作。','The room’s current role does not accept this action.','Le rôle actuel de la salle ne permet pas cette action.'],
 noMapping:['此端口没有可确认的接收流分配。','This output has no confirmed receive-stream assignment.','Aucun flux de réception confirmé pour cette sortie.'],
 revokeFirst:['请先收回发言权，再将该教室静音。','Revoke the floor before muting this room.','Retirez la parole avant de couper le micro de cette salle.'],
 deviceRejected:['设备拒绝了该操作。','The device rejected this action.','L’appareil a refusé cette opération.'],
 joinTimeout:['尚未确认听课端入会；请重试加入。','Listener join was not confirmed. Retry joining.','Participation non confirmée. Réessayez la connexion.'],
 startTimeout:['主讲端尚未确认开课。','Host has not confirmed class start.','L’hôte n’a pas confirmé le démarrage.'],
 endTimeout:['尚未确认两端均已退会。','Both rooms have not yet confirmed leaving.','La sortie des deux salles n’a pas été confirmée.'],
 noChannels:['未能读取设备通道列表。','Unable to read the channel list.','Impossible de lire la liste des canaux.'],
 unconfigured:['未配置该教室的设备地址。','Device address is not configured for this room.','L’adresse de l’appareil n’est pas configurée.'],
 invalidSetting:['此设备不接受选定的参数。','This device does not accept that setting.','Cet appareil n’accepte pas ce paramètre.'],
 local_only:['请在本机操作','Use the local console','Utilisez le poste local'],
 offline:['设备离线','Device offline','Appareil hors ligne'],
 busy:['另一项操作正在进行','Another action is in progress','Une autre opération est en cours'],
 no_class:['当前没有可以控制的课堂','No active class','Aucune classe active'],
 different_class:['两端未加入同一课堂','Rooms are in different classes','Les salles ne sont pas dans la même classe'],
 inactive:['设备未入会','Room is not in class','Salle hors de la classe'],
 unavailable:['设备未提供该能力','Device capability unavailable','Fonction indisponible'],
 verification_failed:['设备回读未确认操作','Device readback did not confirm the change','La relecture ne confirme pas la modification']
};
function failure(detail){
  if(typeof detail==='string')return detail;
  const key=typeof detail?.key==='string'?detail.key:'';
  const arr=translatedErrors[key];const i=languages.indexOf(lang);
  return [t('failed'),(arr?arr[i]:key.replaceAll('_',' ')),detail?.room?t(detail.room):''].filter(Boolean).join(' · ');
}
async function requestPower(id){
  if(mode!=='live'||!localControl()||powerRequests.has(id)||room(id).powerState)return;
  powerRequests.add(id);
  render();
  try{
    const res=await fetch('/api/classroom/action?mode=live',{method:'POST',
      headers:{'Content-Type':'application/json','X-Requested-With':'IQVideo'},
      body:JSON.stringify({action:'powerOn',host:id,room:id}),signal:AbortSignal.timeout(30000)});
    const payload=await res.json();
    if(!res.ok)throw Error(failure(payload.detail));
    const target=payload.rooms.find(r=>r.id===id);
    if(mode==='live'&&snapshot&&target){
      requestSerial++;
      snapshot.rooms=snapshot.rooms.map(r=>r.id===id?target:r);
    }
  }catch(err){
    if(mode==='live')setNote({text:err.message,tone:'error'});
  }finally{
    powerRequests.delete(id);
    render();
    if(mode==='live')void refresh();
  }
}
async function execute(data){
  if(busy||!localControl())return;
  let why='';
  const current=actualHost();
  if(data.action==='start' && current && current!==data.host){
    why=t('roleImpact')+'\n\n'+impact();data.restart=true;
  }
  if(data.action==='end')why=t('endImpact')+'\n\n'+impact();
  if(data.action==='record' && data.value===0)why=t(data.room)+' · '+t('recStopImpact');
  if(data.action==='apply'){
    why=draftSummary().join('\n')+'\n\n'+t('applyImpact',{room:t(data.host)})+'\n'+impact();data.restart=true;
  }
  if(why){
    const title=t(({apply:'applyQuestion',end:'stopQuestion',record:'recStopQuestion',start:'switchHost'})[data.action]);
    if(!await confirmAction(title,why)){render();return;}
  }
  if(busy)return;
  busy=true;requestSerial++;request?.abort();request=null;polling=false;
  setNote({key:'pending',tone:'working'});rebuild();
  const abort=new AbortController();const timer=setTimeout(()=>abort.abort(),120000);
  try{
    const res=await fetch('/api/classroom/action?mode='+mode,{method:'POST',headers:{'Content-Type':'application/json','X-Requested-With':'IQVideo'},body:JSON.stringify(data),signal:abort.signal});
    const payload=await res.json();
    if(!res.ok){
      if(Array.isArray(payload.detail?.steps))journal=payload.detail.steps;
      throw Error(failure(payload.detail));
    }
    receive(payload);
    journal=payload.steps||[];
    if(data.action==='apply')drafts[mode]={a:{},b:{}};
    if(data.action==='start'||data.action==='apply')initialHost=false;
    setNote({key:'done',tone:'success'});
  }catch(err){
    setNote(err.name==='AbortError'?{key:'timeout',tone:'error'}:{text:err.message,tone:'error'});
  }finally{
    clearTimeout(timer);busy=false;rebuild();void refresh();
  }
}
$('#language').addEventListener('change',e=>{
  lang=e.target.value;t=translator(lang);save('language',lang);rebuild();
});
document.addEventListener('click',event=>{
  const el=event.target.closest('button[data-action]');
  if(!el||el.disabled)return;
  const d=el.dataset;
  switch(d.action){
    case 'expand':{
      const frame=el.closest('.media-box');
      const operation=document.fullscreenElement?document.exitFullscreen?.():frame.requestFullscreen?.();
      if(operation)operation.catch(()=>setNote({key:'expandFail',tone:'error'}));
      else setNote({key:'expandFail',tone:'error'});
      return;
    }
    case 'mode':switchMode(d.value);return;
    case 'tab':setTab(d.value);return;
    case 'host':host=d.room;initialHost=false;render();return;
    case 'view':view[d.room]=d.value;render();return;
    case 'discard':drafts[mode]={a:{},b:{}};render();return;
    case 'apply':void execute({action:'apply',host,changes:structuredClone(drafts[mode])});return;
    case 'start':void execute({action:'start',host});return;
    case 'powerOn':void requestPower(d.room);return;
    case 'rejoin':case 'end':void execute({action:d.action,host:actualHost()||host});return;
    case 'speak':case 'mute':case 'record':void execute({action:d.action,host:actualHost()||host,room:d.room,value:Number(d.value)});return;
  }
});
$('#page').addEventListener('change',event=>{
  const el=event.target,d=el.dataset;
  if(!d.field||el.disabled)return;
  if(d.field==='route'){
    const value=Number(el.value);el.value=el.dataset.current;
    void execute({action:'route',host:actualHost()||host,room:d.room,port:Number(d.port),value});
  }else if(d.field==='setting'){
    const value=d.key.startsWith('quality')?el.value:Number(el.value);
    if(value===room(d.room).settings?.[d.key])delete drafts[mode][d.room][d.key];
    else drafts[mode][d.room][d.key]=value;
    render();
  }else if(d.field==='host'){host=el.value;initialHost=false;render();}
  else if(d.field==='observation'){
    const key=[mode,actualHost()||host,d.type].join(':');
    if(el.value)observations.set(key,{time:new Date().toISOString(),value:el.value});
    else observations.delete(key);render();
  }
});
$('#page').addEventListener('toggle',event=>{
  if(event.target.dataset.detail==='test')testExpanded=event.target.open;
  if(event.target.dataset.detail==='log')logExpanded=event.target.open;
},true);
window.addEventListener('hashchange',()=>setTab(location.hash.slice(1),false));
window.addEventListener('pagehide',()=>{clearMonitors();cleanupLibrary?.();request?.abort();});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)void refresh();});
rebuild();void refresh();
setInterval(()=>{if(!document.hidden)void refresh();},3500);
