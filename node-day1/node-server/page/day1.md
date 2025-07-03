# Day 1：Node.js 基础入门学习计划

## 🎯 今日目标

* 理解 Node.js 的运行机制和使用场景
* 熟悉事件循环模型（Event Loop）
* 掌握核心模块：`fs`、`path`、`http`、`url`
* 能用原生 Node 搭建一个简单的 Web 服务

---

## 🧠 理论学习

### 1️⃣ 什么是 Node.js？

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时，适合开发高并发、IO 密集型的后端服务。

**推荐资料：**

* Node.js 官方介绍：[https://nodejs.org/zh-cn/about](https://nodejs.org/zh-cn/about)
* 简明博客：[深入浅出 Node.js 入门](https://juejin.cn/post/6844904117322063886)

### 2️⃣ Node.js 的运行机制：事件循环

理解事件循环（Event Loop）对后续的异步编程非常关键。

**推荐阅读：**

* 官方说明：[Node Event Loop 官方文档](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
* 图解 Node.js 事件循环（推荐）：[https://nodejs.dev/en/learn/the-nodejs-event-loop](https://nodejs.dev/en/learn/the-nodejs-event-loop)

**视频推荐：**

* B 站：搜索关键词「Node.js 事件循环」：[https://www.bilibili.com/video/BV1pi4y1f7v6](https://www.bilibili.com/video/BV1pi4y1f7v6)

---

## 🛠️ 实践模块学习

### 3️⃣ 核心模块学习

以下是今天要掌握的 Node 核心模块：

#### ✅ `fs`：文件系统模块

文档：[https://nodejs.org/api/fs.html](https://nodejs.org/api/fs.html)

```js
const fs = require('fs');

// 同步读取
const data = fs.readFileSync('./demo.txt', 'utf8');
console.log(data);

// 异步写入
fs.writeFile('./output.txt', '写入内容', (err) => {
  if (err) throw err;
  console.log('写入成功！');
});
```

#### ✅ `path`：路径处理模块

文档：[https://nodejs.org/api/path.html](https://nodejs.org/api/path.html)

```js
const path = require('path');

const filePath = path.join(__dirname, 'folder', 'file.txt');
console.log(filePath);  // 拼接出绝对路径
console.log(path.basename(filePath)); // 输出 file.txt
```

#### ✅ `http`：构建 HTTP 服务

文档：[https://nodejs.org/api/http.html](https://nodejs.org/api/http.html)

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello Node.js</h1>');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

#### ✅ `url`：URL 解析模块

文档：[https://nodejs.org/api/url.html](https://nodejs.org/api/url.html)

```js
const url = require('url');

const myUrl = url.parse('http://localhost:3000/user?id=123', true);
console.log(myUrl.pathname); // 输出 /user
console.log(myUrl.query.id); // 输出 123
```

---

## 🧪 综合练习：搭建一个静态文件服务器

功能要求：

* 监听本地端口
* 访问 `/` 时返回 `index.html`
* 支持静态文件返回（html/css/js）

### 📁 目录结构：

```
project/
├── index.js
├── public/
│   ├── index.html
│   └── style.css
```

### 📄 `index.js` 示例代码：

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  let extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.css': contentType = 'text/css'; break;
    case '.js': contentType = 'text/javascript'; break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(3000, () => {
  console.log('静态服务运行在 http://localhost:3000');
});
```

---

## 📚 拓展阅读推荐

* [深入浅出 Node.js（豆瓣评分 8.6）](https://book.douban.com/subject/25768396/)
* 掘金博客系列：[Node.js 进阶教程（@su37josephxia）](https://juejin.cn/user/1415826704971918/posts)

---

## ✅ 今日 checklist

| 项目                     | 完成情况 |
| ---------------------- | ---- |
| 安装 Node、nvm            | ✅    |
| 理解事件循环模型               | ✅    |
| 掌握 fs/path/http/url 模块 | ✅    |
| 能手写静态服务器               | ✅    |
| 完成练习 + 提交代码            | ✅    |
