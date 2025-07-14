const { readFileSync } = require('./file.js');

(async () => {
  const file = await readFileSync('./txt.text')
  console.log(file)
})()