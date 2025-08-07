// heavy.js
function heavy() {
  let total = 0;
  for (let i = 0; i < 1e9; i++) {
    total += i;
  }
  return total;
}


console.time('heavy');
console.log(heavy());
console.timeEnd('heavy');
