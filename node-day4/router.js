const http = require('http');
const routerMiddle = require('./routes/index')
const server = http.createServer((req, res) => {
  routerMiddle(req, res)
});

server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
