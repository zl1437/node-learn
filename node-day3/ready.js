import fs from 'fs'
//  同步读取文件
// const data = fs.readFileSync('111.txt', 'utf-8');
// console.log(data)

// 异步读取文件
// fs.readFile('111.txt', 'utf-8', function (err, data) {
//   if (err) {
//     console.error(err);
//   }
//   console.log(data)
// })

// promise 风格
// (async () => {
//   const data = fs.readFileSync('111.txt', 'utf-8');
//   console.log(data)
// })()

// 写入文件
// fs.writeFile('111.txt', '2222', function(err, data) {
//   if (err) {
//     console.error(err);
//   }
//   console.log(data)
// })

// fs.writeFileSync('111.txt', '111111')
// fs.mkdirSync('124');
// fs.unlinkSync('111.txt');
fs.watch('111.txt', (event, filename) => {
  console.log(`文件变动: ${event}`);
});