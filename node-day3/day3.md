
# Node.js 第三天学习笔记：文件系统与路径处理

## ✅ 今日目标

- 掌握 fs 模块：同步/异步/Promise/流式文件操作
- 学会使用 path 模块处理路径
- 理解异常处理方式（try-catch、事件机制、全局捕获）
- 熟悉调试技巧（console、断点、vscode 调试、node inspect）

---

## 1. 文件系统模块（fs）详解

### ✅ 同步读取文件
```js
const fs = require('fs');
const data = fs.readFileSync('example.txt', 'utf-8');
console.log(data);
```

### ✅ 异步读取文件
```js
fs.readFile('example.txt', 'utf-8', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

### ✅ Promise 风格（推荐）
```js
const fs = require('fs/promises');

(async () => {
  const data = await fs.readFile('example.txt', 'utf-8');
  console.log(data);
})();
```

### ✅ 写入文件
```js
fs.writeFileSync('output.txt', 'Hello Node!');
```

### ✅ 创建目录 & 删除文件
```js
fs.mkdirSync('logs');
fs.unlinkSync('output.txt');
```

### ✅ 监听文件变化
```js
fs.watch('example.txt', (event, filename) => {
  console.log(`文件变动: ${event}`);
});
```

---

## 2. 路径处理模块（path）

```js
const path = require('path');

const joined = path.join(__dirname, 'files', 'example.txt');
const resolved = path.resolve('src', 'main.js');

console.log(joined);   // 拼接路径（不会解析绝对路径）
console.log(resolved); // 解析为绝对路径

console.log(path.basename('/foo/bar.txt')); // bar.txt
console.log(path.extname('bar.txt'));       // .txt
```

---

## 3. 异常捕获与全局错误处理

### ✅ try-catch 捕获同步异常
```js
try {
  JSON.parse('invalid json');
} catch (e) {
  console.error('解析失败：', e.message);
}
```

### ✅ 异步异常处理（Promise）
```js
fs.promises.readFile('not_exist.txt')
  .catch(err => console.error('文件读取失败：', err));
```

### ✅ 捕获未处理异常（最后防线）
```js
process.on('uncaughtException', err => {
  console.error('未捕获异常：', err);
});

process.on('unhandledRejection', reason => {
  console.error('未处理的 Promise 异常：', reason);
});
```

---

## 4. 调试技巧

### ✅ console 调试
```js
console.log(), console.error(), console.table()
```

### ✅ Node 内置调试器
```bash
node inspect app.js
```

### ✅ VS Code 调试 Node
- 在 VS Code 中打开项目
- 点击调试 → 添加配置
- 选择 Node.js → 设置断点 → 启动

---

## 5. 练习题与实战建议

### 🧠 练习题

1. 编写程序，读取一个文本文件，将内容转为大写后写入新文件
2. 创建一个函数，读取目录中所有 .js 文件并打印其文件名
3. 编写监听器，监听文件变更并打印日志
4. 使用 path 判断两个路径是否指向同一目录
5. 模拟异常，使用 try-catch 和 process.on 捕获错误

### 💡 实战建议

- 使用 `fs/promises` 替代传统 fs 回调函数，提高代码可维护性
- 路径操作优先用 `path.join()` 和 `path.resolve()` 避免平台兼容问题
- 保持错误处理意识，做好全局异常捕获，避免程序崩溃
- 熟练掌握调试器调试流程，提高排查效率
