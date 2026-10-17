'use strict';
/* Confirmed rules from the 2026-10-13 instruction. Ties use the most recent game among tied abilities. */
(()=>{
const version='adult-rules-20261017-10care',axes=['あたま','からだ','きよう','みりょく','やさしさ'];
const normal=['先生','アスリート','シェフ','アイドル','ママ'],upper=['弁護士','メダリスト','監督','女優','ナース'],bad=['詐欺師','ギャング','怪盗','ラッパー','ヤンママ'];
const names=[...normal,'モデル','保育士','サラリーマン',...upper,'宇宙飛行士','別班','社長',...bad,'海賊','子供部屋','ヤンキー'];
// Only approved, explicitly mapped adult art may be registered here. No substitutes.
const art={"先生":{"manifestId":"teacher","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[0,0,350,450],"size":[1400,900]},"アスリート":{"manifestId":"athlete","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[350,0,350,450],"size":[1400,900]},"シェフ":{"manifestId":"chef","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[700,0,350,450],"size":[1400,900]},"アイドル":{"manifestId":"idol","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[1050,0,350,450],"size":[1400,900]},"ママ":{"manifestId":"mama","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[0,450,350,450],"size":[1400,900]},"モデル":{"manifestId":"model","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[350,450,350,450],"size":[1400,900]},"保育士":{"manifestId":"nursery","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[700,450,350,450],"size":[1400,900]},"サラリーマン":{"manifestId":"salaryman","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[1050,450,350,450],"size":[1400,900]},"弁護士":{"manifestId":"lawyer","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[0,0,350,450],"size":[1400,900]},"メダリスト":{"manifestId":"medalist","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[350,0,350,450],"size":[1400,900]},"監督":{"manifestId":"director","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[700,0,350,450],"size":[1400,900]},"女優":{"manifestId":"actress","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[1050,0,350,450],"size":[1400,900]},"ナース":{"manifestId":"nurse","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[0,450,350,450],"size":[1400,900]},"社長":{"manifestId":"ceo","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[350,450,350,450],"size":[1400,900]},"宇宙飛行士":{"manifestId":"astronaut","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[700,450,350,450],"size":[1400,900]},"別班":{"manifestId":"betsupan","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[1050,450,350,450],"size":[1400,900]},"詐欺師":{"manifestId":"conartist","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[0,0,350,450],"size":[1400,900]},"ヤンキー":{"manifestId":"yankee","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[350,0,350,450],"size":[1400,900]},"ギャング":{"manifestId":"gangster","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[700,0,350,450],"size":[1400,900]},"子供部屋":{"manifestId":"kodomobeya","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[1050,0,350,450],"size":[1400,900]},"ラッパー":{"manifestId":"rapper","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[0,450,350,450],"size":[1400,900]},"怪盗":{"manifestId":"phantom_thief","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[350,450,350,450],"size":[1400,900]},"海賊":{"manifestId":"pirate","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[700,450,350,450],"size":[1400,900]},"ヤンママ":{"manifestId":"yanmama","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[1050,450,350,450],"size":[1400,900]},"天使":{"manifestId":"angel","category":"secret","sheet":"assets/adults/adult_secret_atlas.webp","rect":[0,0,700,858],"size":[1400,858]},"悪魔":{"manifestId":"devil","category":"secret","sheet":"assets/adults/adult_secret_atlas.webp","rect":[700,0,700,858],"size":[1400,858]}};
const allNames=[...names,"天使","悪魔"];
const baseIds=['baby','gaki','tensai','akugaki'];
function collectionComplete(collection={}){return baseIds.every(id=>(collection.seen||[]).includes(id))&&names.every(n=>(collection.album||[]).some(e=>e.name===n));}
const secretPolicy={status:'confirmed',normalSpecies:28,requiredTotal:30,routes:{tensai:'天使',akugaki:'悪魔'}};
// Display crop is inside each source cell, and never reaches the neighboring card.
for(const a of Object.values(art)){const [x,y,w,h]=a.rect;const left=a.category==='secret'?12:Math.round(x/350)===3?28:Math.round(x/350)===2?16:4;const top=a.category==='secret'?0:y>0?(a.category==='genius'?24:12):4;const end=a.category==='secret'?752:a.category==='genius'?(y?410:403):a.category==='bad'?(y?390:380):(y?388:380);a.displayRect=[x+left,y+top,w-left-4,end-top];}
art['アイドル'].sheet='assets/adults/idol-corrected.webp';art['アイドル'].rect=[0,0,700,900];art['アイドル'].size=[700,900];art['アイドル'].displayRect=[56,8,636,750];
function resolve(route,scores,records=[],collection={}){
 if(!['gaki','tensai','akugaki'].includes(route)||!Array.isArray(scores)||scores.length!==5||scores.some(n=>!Number.isInteger(n)||n<0)||scores.reduce((a,b)=>a+b,0)>20)return {status:'pending',reason:'育成記録の値を確認してください',candidates:[],version};
 const total=scores.reduce((a,b)=>a+b,0),[head,body,hand,charm,kind]=scores;
 if(total===20&&records.length===10&&collectionComplete(collection)&&secretPolicy.routes[route]){const name=secretPolicy.routes[route];return {status:'resolved',id:name==='天使'?'secret-angel':'secret-devil',name,rule:'通常28種解放済み・'+(route==='tensai'?'天才':'悪ガキ')+'ルート・成長期20点',special:true,version};}
 const yes=(name,rule)=>({status:'resolved',id:'adult-'+names.indexOf(name),name,rule,version});
 const choose=(jobs,indices,rule)=>{
  if(indices.length===1)return yes(jobs[indices[0]],rule);
  const games=['drill','rope','bento','shutter','lost'];
  for(let i=records.length-1;i>=0;i--){const axis=games.indexOf(records[i].game);if(indices.includes(axis))return {...yes(jobs[axis],rule+'／同点は該当能力の直近プレイを優先'),tieBreakGame:games[axis]};}
  return {status:'pending',reason:'同点を決めるプレイ履歴がありません',candidates:indices.map(i=>jobs[i]),axes:indices.map(i=>axes[i]),rule,version};
 };
 const max=()=>scores.map((n,i)=>n===Math.max(...scores)?i:-1).filter(i=>i>=0);
 const threshold=n=>scores.map((v,i)=>v>=n?i:-1).filter(i=>i>=0);
 if(route==='gaki'){
  if(total>=10&&body>=4&&charm>=4)return yes('モデル','複合：からだ4・みりょく4（保育士より優先）');
  if(total>=10&&total<=19&&head>=4&&kind>=4)return yes('保育士','複合：あたま4・やさしさ4／合計10〜19');
  if(total>=16&&threshold(10).length)return choose(upper,threshold(10),'裏進化：合計16以上・対応能力10以上');
  if(total>=10)return choose(normal,max(),'合計10以上・最高能力');
  if(total>=4)return yes('サラリーマン','合計4〜9');
  return choose(bad,max(),'合計0〜5・最高能力');
 }
 if(route==='tensai'){
  if(total>=10&&head>=4&&hand>=4)return yes('別班','複合：あたま4・きよう4（宇宙飛行士より優先）');
  if(total>=10&&head>=4&&body>=4)return yes('宇宙飛行士','複合：あたま4・からだ4');
  if(total>=10)return choose(upper,max(),'合計10以上・最高能力');
  if(total>=4)return yes('社長','合計4〜9');
  if(total>=2)return choose(normal,max(),'合計2〜5・最高能力');
  if(total===1)return choose(bad,max(),'合計1・得点能力');
  return yes('子供部屋','合計0');
 }
 if(total>=10&&head>=4&&body>=4)return yes('海賊','複合：あたま4・からだ4');
 if(threshold(17).length)return choose(upper,threshold(17),'超裏進化：対応能力17以上');
 if(total>=16&&threshold(10).length)return choose(normal,threshold(10),'裏進化：合計16以上・対応能力10以上');
 if(total>=10)return choose(bad,max(),'合計10以上・最高能力（10点も優先）');
 if(total===0)return yes('子供部屋','合計0');
 return yes('ヤンキー','合計1〜9・上位条件なし');
}
globalThis.YuuraEvolution={version,axes,names,allNames,art,baseIds,collectionComplete,secretPolicy,resolve};
})();
