const fs = require('fs').promises;
fs.readFile('./txt.text', 'utf-8').then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})