// Number the new ideas from #146, attach source info, split into batches of 15.
const fs=require("fs");const I=require("../src/data/ideas.json"),S=require("../src/data/sources.json"),N=require("./new-sources.json");
let n=I.length,all=[],seen=new Set(I.map(i=>i.name.toLowerCase()));
for(const t of [1,2,3]){for(const x of JSON.parse(fs.readFileSync(`ideas-t${t}.json`))){
  if(seen.has(x.name.toLowerCase()))continue;seen.add(x.name.toLowerCase());
  const src=x.basedOn.filter(b=>S[b]||N[b]);if(!src.length)continue;
  all.push({...x,track:t,basedOn:src,n:++n,sources:src.map(b=>b+" ("+(S[b]?S[b].event:N[b].event)+")"+(N[b]?" — "+N[b].what:""))})}}
fs.writeFileSync("new-ideas.json",JSON.stringify(all,null,1));
const k=Math.ceil(all.length/15);for(let p=0;p<k;p++)fs.writeFileSync(`batch${p+1}.json`,JSON.stringify(all.slice(p*15,p*15+15),null,1));
const names=[...I.map(i=>`#${i.n} ${i.name}`),...all.map(i=>`#${i.n} ${i.name}`)];fs.writeFileSync("all-names.txt",names.join("\n"));
console.log("new ideas",all.length,"batches",k,"range",all[0]?.n,"-",n);
