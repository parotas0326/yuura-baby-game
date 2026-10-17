'use strict';
// Only the approved 4 BGM files and 9 SE files are played. No synthesized sounds.
window.UlifeAudio=(()=>{
 const root='assets/audio/';
 const tracks={opening:'uLife_opening_audio.ogg',main:'beloved_monster.ogg',minigame:'uLife_minigame_bgm.ogg',lullaby:'uLife_lullaby_bgm.ogg'};
 // Volume is program-level (0..1). Different masters have different perceived loudness.
 const volumes={opening:.90,main:.25,minigame:.68,lullaby:.52};
 const files={shutter:'カメラのシャッター1.mp3',tap:'水滴2.mp3',correct:'クイズ正解2.mp3',wrong:'クイズ不正解1.mp3',land:'ジャンプの着地.mp3',peek:'「ばあ！」.mp3',confirm:'決定ボタンを押す12.mp3',drop:'拳銃を落とす.mp3',miss:'ニュッ2.mp3'};
 const volumesSE={shutter:.95,tap:.95,correct:.8,wrong:.8,land:.95,peek:.85,confirm:.65,drop:.95,miss:.8};
 const music=new Audio();music.loop=true;music.preload='auto';
 let enabled=false,unlocked=false,track='',context=null,loading=null;
 const buffers={},fallback={},voices=new Set(),recent={};
 function initContext(){
  if(context)return;
  try{context=new(window.AudioContext||window.webkitAudioContext)();}catch(e){console.warn('SE WebAudio unavailable',e);}
 }
 function prepare(){
  if(loading)return loading;
  initContext();
  loading=Promise.all(Object.entries(files).map(async([key,file])=>{
   const url=root+encodeURIComponent(file);
   const audio=new Audio(url);audio.preload='auto';fallback[key]=audio;
   if(!context)return;
   try{const response=await fetch(url);if(!response.ok)throw Error(response.status);buffers[key]=await context.decodeAudioData(await response.arrayBuffer());}
   catch(e){console.warn('SE decoding failed, using HTML audio:',key,e);}
  }));
  return loading;
 }
 function play(){if(!enabled||!unlocked||document.hidden||!track)return;const result=music.play();result?.catch(e=>console.warn('BGM playback blocked',e));}
 function scene(name,game){
  const next=['title','intro'].includes(name)?'opening':name==='playing'?(game==='sleep'?'lullaby':'minigame'):'main';
  if(track!==next){music.pause();track=next;music.src=root+tracks[next];music.load();}
  music.playbackRate=1;music.volume=volumes[next];play();
 }
 function stopVoices(){for(const source of voices){try{source.stop();}catch{}}voices.clear();for(const a of Object.values(fallback)){try{a.pause();a.currentTime=0;}catch{}}}
 function setEnabled(value){enabled=!!value;if(enabled){if(unlocked)prepare();play();}else{music.pause();stopVoices();}}
 function unlock(){
  unlocked=true;
  prepare();
  if(context?.state==='suspended')context.resume().catch(e=>console.warn('SE context resume failed',e));
  play();
 }
 function htmlSE(key){
  const original=fallback[key]||new Audio(root+encodeURIComponent(files[key]));
  const a=original.paused?original:original.cloneNode(true);
  a.volume=volumesSE[key];a.playbackRate=1;
  try{a.currentTime=0;}catch{}
  const promise=a.play();promise?.catch(e=>console.warn('SE play blocked',key,e));
 }
 function se(key){
  if(!enabled||!unlocked||document.hidden||!files[key])return;
  const now=performance.now();if(now-(recent[key]??-Infinity)<(key==='tap'?45:90))return;
  if(key==='miss'&&now-(recent.wrong??-Infinity)<300)return;
  recent[key]=now;
  if(context&&context.state==='running'&&buffers[key]){
   try{const source=context.createBufferSource(),gain=context.createGain();source.buffer=buffers[key];gain.gain.value=volumesSE[key];source.connect(gain);gain.connect(context.destination);voices.add(source);source.onended=()=>{voices.delete(source);source.disconnect();gain.disconnect();};source.start(0);return;}
   catch(e){console.warn('SE WebAudio error',key,e);}
  }
  // iOS fallback while the decoded buffer is loading or AudioContext remains suspended.
  htmlSE(key);
 }
 document.addEventListener('pointerdown',unlock,{capture:true,passive:true});
 document.addEventListener('touchstart',unlock,{capture:true,passive:true});
 document.addEventListener('keydown',unlock,{capture:true});
 document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled||b.matches('#sound,#settingSound,#gSound,#titleSound,#peekButton,#tapZone,#gJump,#gShutter,#gConfirm,[data-answer]')||b.closest('#arena'))return;se('confirm');},true);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){music.pause();stopVoices();}else{if(context?.state==='suspended')context.resume().catch(()=>{});play();}});
 window.addEventListener('pagehide',()=>music.pause());window.addEventListener('pageshow',play);
 return {scene,setEnabled,se,ready:()=>loading||Promise.resolve(),status:()=>({enabled,unlocked,track,paused:music.paused,time:music.currentTime,seReady:Object.keys(buffers).length,context:context?.state})};
})();
