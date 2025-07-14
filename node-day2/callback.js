const fs = require('fs')
fs.readFile('./txt.text', 'utf-8', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
})