const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
console.log(filePath);  // 拼接出绝对路径

console.log(path.basename(filePath)); // 输出 file.txt