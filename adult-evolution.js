'use strict';
/* Confirmed rules from the 2026-10-13 instruction. Ties use the most recent game among tied abilities. */
(()=>{
const version='adult-rules-20261014',axes=['あたま','からだ','きよう','みりょく','やさしさ'];
const normal=['先生','アスリート','シェフ','アイドル','ママ'],upper=['弁護士','メダリスト','監督','女優','ナース'],bad=['詐欺師','ギャング','怪盗','ラッパー','ヤンママ'];
const names=[...normal,'モデル','保育士','サラリーマン',...upper,'宇宙飛行士','別班','社長',...bad,'海賊','子供部屋','ヤンキー'];
// Only approved, explicitly mapped adult art may be registered here. No substitutes.
const art={"先生":{"manifestId":"teacher","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[0,0,350,450],"size":[1400,900]},"アスリート":{"manifestId":"athlete","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[350,0,350,450],"size":[1400,900]},"シェフ":{"manifestId":"chef","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[700,0,350,450],"size":[1400,900]},"アイドル":{"manifestId":"idol","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[1050,0,350,450],"size":[1400,900]},"ママ":{"manifestId":"mama","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[0,450,350,450],"size":[1400,900]},"モデル":{"manifestId":"model","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[350,450,350,450],"size":[1400,900]},"保育士":{"manifestId":"nursery","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[700,450,350,450],"size":[1400,900]},"サラリーマン":{"manifestId":"salaryman","category":"normal","sheet":"assets/adults/adult_normal_atlas.webp","rect":[1050,450,350,450],"size":[1400,900]},"弁護士":{"manifestId":"lawyer","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[0,0,350,450],"size":[1400,900]},"メダリスト":{"manifestId":"medalist","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[350,0,350,450],"size":[1400,900]},"監督":{"manifestId":"director","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[700,0,350,450],"size":[1400,900]},"女優":{"manifestId":"actress","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[1050,0,350,450],"size":[1400,900]},"ナース":{"manifestId":"nurse","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[0,450,350,450],"size":[1400,900]},"社長":{"manifestId":"ceo","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[350,450,350,450],"size":[1400,900]},"宇宙飛行士":{"manifestId":"astronaut","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[700,450,350,450],"size":[1400,900]},"別班":{"manifestId":"betsupan","category":"genius","sheet":"assets/adults/adult_genius_atlas.webp","rect":[1050,450,350,450],"size":[1400,900]},"詐欺師":{"manifestId":"conartist","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[0,0,350,450],"size":[1400,900]},"ヤンキー":{"manifestId":"yankee","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[350,0,350,450],"size":[1400,900]},"ギャング":{"manifestId":"gangster","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[700,0,350,450],"size":[1400,900]},"子供部屋":{"manifestId":"kodomobeya","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[1050,0,350,450],"size":[1400,900]},"ラッパー":{"manifestId":"rapper","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[0,450,350,450],"size":[1400,900]},"怪盗":{"manifestId":"phantom_thief","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[350,450,350,450],"size":[1400,900]},"海賊":{"manifestId":"pirate","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[700,450,350,450],"size":[1400,900]},"ヤンママ":{"manifestId":"yanmama","category":"bad","sheet":"assets/adults/adult_bad_atlas.webp","rect":[1050,450,350,450],"size":[1400,900]},"天使":{"manifestId":"angel","category":"secret","sheet":"assets/adults/adult_secret_atlas.webp","rect":[0,0,700,858],"size":[1400,858]},"悪魔":{"manifestId":"devil","category":"secret","sheet":"assets/adults/adult_secret_atlas.webp","rect":[700,0,700,858],"size":[1400,858]}};
const allNames=[...names,"天使","悪魔"];
const secretPolicy={status:"confirmation-required",reason:"全コンプ後の獲得方法（同時獲得か追加育成か）は未確定"};
function resolve(route,scores,records=[]){
 if(!['gaki','tensai','akugaki'].includes(route)||!Array.isArray(scores)||scores.length!==5||scores.some(n=>!Number.isInteger(n)||n<0)||scores.reduce((a,b)=>a+b,0)>30)return {status:'pending',reason:'育成記録の値を確認してください',candidates:[],version};
 const total=scores.reduce((a,b)=>a+b,0),[head,body,hand,charm,kind]=scores;
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
globalThis.YuuraEvolution={version,axes,names,allNames,art,secretPolicy,resolve};
})();
