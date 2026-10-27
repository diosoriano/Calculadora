let expr = '';
const historyEl = document.getElementById('history');
const resultEl = document.getElementById('result');

function updateDisplay(){
  resultEl.textContent = expr || '0';
  resultEl.style.fontSize = expr.length > 10 ? '28px' : '42px';
}

function append(v){
  const ops = ['+','-','*','/','%','.'];
  if(ops.includes(v) && ops.includes(expr.slice(-1))){
    expr = expr.slice(0,-1);
  }
  if(expr === '0' && v !== '.') expr = v;
  else expr += v;
  if(expr === '') expr = '';
  updateDisplay();
}

function clearAll(){
  expr = '';
  historyEl.textContent = '';
  updateDisplay();
}

function del(){
  expr = expr.slice(0,-1);
  updateDisplay();
}

function calc(){
  try{
    if(!expr) return;
    historyEl.textContent = expr.replaceAll('*','×').replaceAll('/','÷');
    let e = expr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
    let res = Function('"use strict"; return ('+e+')')();
    if(!isFinite(res)) throw Error();
    expr = String(res).slice(0,12);
    updateDisplay();
  } catch{
    resultEl.textContent = 'Erro';
    expr = '';
  }
}

document.addEventListener('keydown', e=>{
  if('0123456789+-*/.%'.includes(e.key)) append(e.key);
  if(e.key === 'Enter') calc();
  if(e.key === 'Backspace') del();
  if(e.key === 'Escape') clearAll();
});