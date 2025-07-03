const fs = require('fs');
const data = fs.readFileSync('./text.txt')
console.log(data.toString())
fs.writeFile('./out.txt', data.toString(), (err, data) => {
    if (err) throw err;
    console.log('写入成功！');
})