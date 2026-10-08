// Merge detailed batches into src/data/ideas.json and new sources into sources.json.
const fs=require("fs");const I=require("../src/data/ideas.json"),S=require("../src/data/sources.json"),N=require("./new-sources.json"),base=require("./new-ideas.json");
const D={};for(const f of fs.readdirSync(".").filter(f=>/^detail\d+\.json$/.test(f)))for(const o of JSON.parse(fs.readFileSync(f)))D[o.n]=o;
const need=["problem","users","how","autonomy","unexpected","codex","mvp","data","demo","sdg","sea","risks","pitch","weakness","upgrade","killer","proof","combo","newScore"];
const out=[],missing=[];
for(const b of base){const d=D[b.n];if(!d||need.some(k=>d[k]==null||(Array.isArray(d[k])&&!d[k].length))||d.newScore.length!==4){missing.push(b.n);continue}
 out.push({n:b.n,name:b.name,track:b.track,sdgs:b.sdgs,basedOn:b.basedOn,idea:b.idea,twist:b.twist,scoreBefore:b.score,score:d.newScore.map(v=>Math.max(1,Math.min(5,v))),
  detail:{problem:d.problem,users:d.users,how:d.how,autonomy:d.autonomy,unexpected:d.unexpected,codex:d.codex,mvp:d.mvp,data:d.data,demo:d.demo,sdg:d.sdg,sea:d.sea,risks:d.risks,pitch:d.pitch,...(b.track===3&&d.domain?{domain:d.domain,expert:d.expert}:{})},
  upgrade:{weakness:d.weakness,fixes:d.upgrade,killer:d.killer,proof:d.proof,combo:d.combo}})}
console.log("detailed",out.length,"missing",missing);
if(missing.length&&!process.argv.includes("--force"))process.exit(1);
for(const b of out)for(const s of b.basedOn)if(!S[s]&&N[s])S[s]={event:N[s].event,url:N[s].url};
fs.writeFileSync("../src/data/ideas.json",JSON.stringify([...I.filter(i=>i.n<=145),...out]));
fs.writeFileSync("../src/data/sources.json",JSON.stringify(S,null,1));
console.log("total ideas",145+out.length,"sources",Object.keys(S).length);
