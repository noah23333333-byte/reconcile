const fs=require('node:fs'),path=require('node:path'),M=require('../dist/model.js'),E=require('../dist/engine.js'),D=require('../dist/demo.js');
const model=M.fit(),map={date:0,amount:1,description:2,reference:3,currency:4},l=E.normalize(D.ledger,map,'L').valid,b=E.normalize(D.bank,map,'B').valid,result=E.reconcile(l,b,model);
const got=new Set(result.matches.map(m=>m.ledgerId+'|'+m.bankId)),truth=new Set(D.truth.auto.map(p=>p.join('|'))),correct=[...got].filter(k=>truth.has(k)).length;
const report={textModel:M.evaluate(model),demoRuleCheck:{expectedAutoPairs:truth.size,actualAutoPairs:got.size,correctAutoPairs:correct,precision:correct/(got.size||1),recall:correct/(truth.size||1),duplicateLedger:result.duplicateLedger},limitations:['Synthetic examples only; no real transaction benchmark.','Model score is uncalibrated and never auto-confirms a fuzzy pair.','Hard negatives deliberately include similar payees and conflicting purposes.']};
fs.writeFileSync(path.join(__dirname,'../docs/evaluation.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({textModelAccuracy:report.textModel.accuracy,textModelF1:report.textModel.f1,demo:report.demoRuleCheck},null,2));
