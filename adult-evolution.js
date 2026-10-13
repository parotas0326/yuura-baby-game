'use strict';
/* Confirmed rules from the 2026-10-13 instruction. Ties remain unresolved. */
(()=>{
const version='adult-rules-20261013',axes=['あたま','からだ','きよう','みりょく','やさしさ'];
const normal=['先生','アスリート','シェフ','アイドル','ママ'],upper=['弁護士','メダリスト','監督','女優','ナース'],bad=['詐欺師','ギャング','怪盗','ラッパー','ヤンママ'];
const names=[...normal,'モデル','保育士','サラリーマン',...upper,'宇宙飛行士','別班','社長',...bad,'海賊','子供部屋','ヤンキー'];
// Only approved, explicitly mapped adult art may be registered here. No substitutes.
const art={};
function resolve(route,scores){
 if(!['gaki','tensai','akugaki'].includes(route)||!Array.isArray(scores)||scores.length!==5||scores.some(n=>!Number.isInteger(n)||n<0)||scores.reduce((a,b)=>a+b,0)>30)return {status:'pending',reason:'育成記録の値を確認してください',candidates:[],version};
 const total=scores.reduce((a,b)=>a+b,0),[head,body,hand,charm,kind]=scores;
 const yes=(name,rule)=>({status:'resolved',id:'adult-'+names.indexOf(name),name,rule,version});
 const choose=(jobs,indices,rule)=>indices.length===1?yes(jobs[indices[0]],rule):{status:'pending',reason:'同点時の優先順位が未確定です',candidates:indices.map(i=>jobs[i]),axes:indices.map(i=>axes[i]),rule,version};
 const max=()=>scores.map((n,i)=>n===Math.max(...scores)?i:-1).filter(i=>i>=0);
 const threshold=n=>scores.map((v,i)=>v>=n?i:-1).filter(i=>i>=0);
 if(route==='gaki'){
  if(total>=15&&body>=6&&charm>=6)return yes('モデル','複合：からだ6・みりょく6（保育士より優先）');
  if(total>=15&&total<=29&&head>=6&&kind>=6)return yes('保育士','複合：あたま6・やさしさ6／合計15〜29');
  if(total>=24&&threshold(15).length)return choose(upper,threshold(15),'裏進化：合計24以上・対応能力15以上');
  if(total>=15)return choose(normal,max(),'合計15以上・最高能力');
  if(total>=6)return yes('サラリーマン','合計6〜14');
  return choose(bad,max(),'合計0〜5・最高能力');
 }
 if(route==='tensai'){
  if(total>=15&&head>=6&&hand>=6)return yes('別班','複合：あたま6・きよう6（宇宙飛行士より優先）');
  if(total>=15&&head>=6&&body>=6)return yes('宇宙飛行士','複合：あたま6・からだ6');
  if(total>=15)return choose(upper,max(),'合計15以上・最高能力');
  if(total>=6)return yes('社長','合計6〜14');
  if(total>=2)return choose(normal,max(),'合計2〜5・最高能力');
  if(total===1)return choose(bad,max(),'合計1・得点能力');
  return yes('子供部屋','合計0');
 }
 if(total>=15&&head>=6&&body>=6)return yes('海賊','複合：あたま6・からだ6');
 if(threshold(25).length)return choose(upper,threshold(25),'超裏進化：対応能力25以上');
 if(total>=24&&threshold(15).length)return choose(normal,threshold(15),'裏進化：合計24以上・対応能力15以上');
 if(total>=15)return choose(bad,max(),'合計15以上・最高能力（15点も優先）');
 if(total===0)return yes('子供部屋','合計0');
 return yes('ヤンキー','合計1〜14・上位条件なし');
}
globalThis.YuuraEvolution={version,axes,names,art,resolve};
})();
