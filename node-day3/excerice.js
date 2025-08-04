// 🧠 练习题
// 编写程序，读取一个文本文件，将内容转为大写后写入新文件

// 创建一个函数，读取目录中所有 .js 文件并打印其文件名

// 编写监听器，监听文件变更并打印日志

// 使用 path 判断两个路径是否指向同一目录

// 模拟异常，使用 try-catch 和 process.on 捕获错误

// 使用 fs/promises 替代传统 fs 回调函数，提高代码可维护性

// import fs from 'fs'
import { join, dirname, resolve, basename, parse } from 'path'
import { fileURLToPath } from 'url'
// const __dirname = dirname(fileURLToPath(import.meta.url))
// const url = join(__dirname, 'logs', 'example.txt')
// const fileData = fs.readFileSync(url, 'utf-8')
// fs.writeFileSync(url, fileData.toUpperCase())

// const url = resolve()
// function getFilenamesSync(dir) {
//   try {
//     const files = fs.readdirSync(dir);
//     return files;
//   } catch (err) {
//     console.error('获取文件列表失败:', err);
//     return [];
//   }
// }
// const files = getFilenamesSync(url)
// console.log(files)
// for (let i=0; i < files.length; i++) {
//   console.log(parse(files[i]).name)
// }

// const __dirname = dirname(fileURLToPath(import.meta.url))
// const url = join(__dirname, 'logs', 'example.txt')
// fs.writeFileSync(url, '111')
// fs.watch(url, (event, filename) => {
//   console.log(`文件变动: ${event}`);
// })


// import path from 'path';

// const p1 = path.resolve('./a');
// const p2 = path.resolve('a/');

// console.log(p1 === p2); // true，路径一致




// fs.readFile('./111.txt', 'utf8', (err, data) => {
//   if (err) return console.error('读取失败:', err);
//   console.log('读取内容:', data);
// });
import fs from 'fs/promises'
async function readData() {
  try {
    const data = await fs.readFile('./111.txt', 'utf8');
    console.log('读取内容:', data);
  } catch (err) {
    console.error('读取失败:', err);
  }
}

readData();
