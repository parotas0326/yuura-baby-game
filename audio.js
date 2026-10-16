'use strict';
// Audio only: no game state, scoring, or save keys are owned by this module.
window.UlifeAudio=(()=>{
 const root='assets/audio/';
 const tracks={opening:'uLife_opening_audio.ogg',main:'beloved_monster.ogg'};
 const files={shutter:'カメラのシャッター1.mp3',tap:'水滴2.mp3',correct:'クイズ正解2.mp3',wrong:'クイズ不正解1.mp3',land:'ジャンプの着地.mp3',peek:'「ばあ！」.mp3',confirm:'決定ボタンを押す12.mp3',drop:'拳銃を落とす.mp3',miss:'ニュッ2.mp3'};
 const music=new Audio();music.loop=true;music.volume=.25;music.preload='auto';
 let enabled=false,unlocked=false,track='',rate=1,context=null,loading=null;
 const buffers={},voices=new Set(),recent={};
 function prepare(){
  if(loading)return loading;
  try{context=new(window.AudioContext||window.webkitAudioContext)();}catch{return Promise.resolve();}
  loading=Promise.all(Object.entries(files).map(async([key,file])=>{
   try{const r=await fetch(root+encodeURIComponent(file));if(!r.ok)throw Error(r.status);buffers[key]=await context.decodeAudioData(await r.arrayBuffer());}catch(e){console.warn('uLife SE unavailable:',key,e);}
  }));return loading;
 }
 function play(){if(!enabled||!unlocked||document.hidden||!track)return;music.playbackRate=rate;const p=music.play();if(p)p.catch(()=>{/* Retry only on the next gesture/scene, never block gameplay. */});}
 function scene(name,game){const next=['title','intro'].includes(name)?'opening':'main';rate=name==='playing'?(game==='sleep'?.5:1.5):1;if(track!==next){music.pause();track=next;music.src=root+tracks[next];music.load();}music.playbackRate=rate;play();}
 function setEnabled(value){enabled=!!value;if(enabled){prepare();play();}else{music.pause();for(const s of voices){try{s.stop();}catch{}}voices.clear();}}
 function unlock(){unlocked=true;prepare();if(context?.state==='suspended')context.resume().catch(()=>{});play();}
 function se(key){
  if(!enabled||!unlocked||document.hidden||!buffers[key]||context?.state!=='running')return;
  const now=performance.now();if(now-(recent[key]??-Infinity)<80)return;
  if(key==='miss'&&now-(recent.wrong??-Infinity)<300)return;
  recent[key]=now;const s=context.createBufferSource(),gain=context.createGain();s.buffer=buffers[key];s.playbackRate.value=1;gain.gain.value=key==='peek'?.55:.45;s.connect(gain);gain.connect(context.destination);voices.add(s);s.onended=()=>{voices.delete(s);s.disconnect();gain.disconnect();};s.start();
 }
 document.addEventListener('pointerdown',unlock,{capture:true,passive:true});
 document.addEventListener('keydown',unlock,{capture:true});
 document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled||b.matches('#sound,#settingSound,#gSound,#titleSound,#peekButton,#tapZone,#gJump,#gShutter,[data-answer]')||b.closest('#arena'))return;se('confirm');},true);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){music.pause();for(const s of voices){try{s.stop();}catch{}}}else play();});
 window.addEventListener('pagehide',()=>music.pause());window.addEventListener('pageshow',play);
 prepare();
 return {scene,setEnabled,se,ready:()=>loading,status:()=>({enabled,unlocked,track,rate,paused:music.paused,time:music.currentTime,seReady:Object.keys(buffers).length})};
})();
