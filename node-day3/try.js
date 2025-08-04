import fs from 'fs'
// try {
//   JSON.parse('invalid json');
// } catch (e) {
//   console.error('解析失败：', e.message);
// }

// fs.promises.readFile('not_exist.txt')
//   .catch(err => console.error('文件读取失败：', err));
// fs.promises.readFile('not_exist.txt')
//   .catch();

// process.on('uncaughtException', err => {
//   console.error('未捕获异常：', err);
// });

process.on('unhandledRejection', reason => {
  console.error('未处理的 Promise 异常：', reason);
});