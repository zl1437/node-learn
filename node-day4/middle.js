import http from 'http'
const middlewareStack = [];

function use(fn) {
  middlewareStack.push(fn);
}

function handler(req, res) {
  let index = 0;
  function next() {
    const fn = middlewareStack[index++];
    if (fn) fn(req, res, next);
  }
  next();
}

// 使用
use((req, res, next) => {
  console.log('中间件1');
  next();
});
use((req, res) => {
  res.end('Hello with middleware');
});

const server = http.createServer(handler);
server.listen(3000);