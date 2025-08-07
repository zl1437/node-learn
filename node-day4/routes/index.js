const routerMiddle = (req, res) => {
  const { url, method } = req;

  // 忽略 favicon.ico 请求
  if (url === '/favicon.ico') {
    res.writeHead(204); // No Content
    return res.end();
  }

  if (method === 'GET') {
    if (url === '/home') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>欢迎来到首页</h1>');
    } else if (url === '/about') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>关于我们页面</h1>');
    } else if (url === '/api') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ code: 0, msg: '成功', data: { name: 'Node 学习者' } }));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('405 Method Not Allowed');
  }
}

module.exports = routerMiddle
  