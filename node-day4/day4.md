# Day 4：构建 Web 服务核心知识 —— HTTP 模块与服务器开发

---

## 1. Node.js HTTP 模块简介

- `http` 是 Node.js 内置模块，用于创建 HTTP 服务器和处理 HTTP 请求响应。
- 常用方法：
  - `http.createServer([requestListener])`：创建服务器实例。
  - 服务器对象的 `listen(port, [hostname], [callback])` 启动服务器。
- 请求对象（`req`）和响应对象（`res`）是回调函数参数。

---

## 2. 创建基础服务器示例

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
```

## 3. 处理请求数据（POST 请求体）
- HTTP 请求体以流的方式传入，需要监听 data 和 end 事件。
```js
let body = '';
req.on('data', chunk => {
  body += chunk;
});
req.on('end', () => {
  try {
    const parsed = JSON.parse(body);
    console.log(parsed);
    res.end('数据接收成功');
  } catch (e) {
    res.statusCode = 400;
    res.end('无效的 JSON');
  }
});
```

## 4. 处理静态文件
- 使用 fs.readFile 读取文件，返回给客户端。

const fs = require('fs');
const path = require('path');
```js
const filePath = path.join(__dirname, 'public', req.url);
fs.readFile(filePath, (err, data) => {
  if (err) {
    res.writeHead(404);
    res.end('Not Found');
  } else {
    res.writeHead(200);
    res.end(data);
  }
});
```

## 5. 简单路由实现
- 根据请求路径和方法，实现不同业务逻辑响应。
```js
if (req.url === '/home' && req.method === 'GET') {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end('<h1>欢迎来到首页</h1>');
} else if (req.url === '/api' && req.method === 'GET') {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({code: 0, msg: '成功', data: {name: 'Node用户'}}));
} else {
  res.writeHead(404);
  res.end('页面不存在');
}
```

## 6. 路由模块抽离示例
- 将路由逻辑放入独立文件 router.js，提高代码结构清晰度。
```js
// router.js
function router(req, res) {
  const { url, method } = req;

  if (url === '/favicon.ico') {
    res.writeHead(204);
    return res.end();
  }

  if (method === 'GET') {
    switch(url) {
      case '/home':
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end('<h1>欢迎来到首页</h1>');
        break;
      case '/about':
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end('<h1>关于我们页面</h1>');
        break;
      case '/api':
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({code: 0, msg: '成功', data: {name: 'Node 学习者'}}));
        break;
      default:
        res.writeHead(404);
        res.end('404 Not Found');
    }
  } else {
    res.writeHead(405);
    res.end('405 Method Not Allowed');
  }
}

module.exports = router;
```

## 7. 主程序使用路由模块示例

```js
const http = require('http');
const router = require('./router');

const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
```

## 总结
- 通过 Node 原生 HTTP 模块可以轻松搭建简单的 Web 服务器。

- 请求体需要流式处理。

- 可以通过判断 req.url 和 req.method 实现基本路由功能。

- 将路由抽离到模块，代码更整洁，方便维护和扩展。

- 理解这些内容是 Node 服务器开发的基础，后续可以进一步实现中间件、静态资源服务、模板渲染等高级功能。



