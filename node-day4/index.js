// 今日目标
// 理解 Node 原生 http 模块的使用

// 熟悉 HTTP 请求响应机制（请求头、状态码、响应流等）

// 能使用原生代码创建 HTTP 服务

// 理解中间件思想及简易实现

// 为后续使用 Express 等框架打基础

// 1. 原生 HTTP 服务的基本结构
// Node 内置 http 模块，无需安装即可构建 Web 服务：

// 2. 请求对象 req 和响应对象 res
// 请求对象 req
// 包含客户端请求信息：
import http from 'http'
import { parse, fileURLToPath } from 'url'
import fs from 'fs'
import { join, dirname } from 'path'
const server = http.createServer((req, res) => {
  // console.log(req.method)
  // console.log(req.url);    
  // console.log(req.headers['user-agent']);
  // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  // res.end('<h1>开始启动3000端口的服务</h1>')

  // const query = url.parse(req.url, true)
  // console.log(query.pathname)
  // console.log(query.query.id)
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify({ msg: 'ok' }));
  
  // post 获取参数
  // if (req.method === 'POST') {
  //   let body = ''
  //   req.on('data', function(res) {
  //     body += res
  //   })
  //   req.on('end', function() {
  //     try {
  //       const params = JSON.parse(body)
  //       console.log(params)
  //       res.writeHead(200, {'content-type': 'application/json; charset=utf-8'})
  //       res.end(JSON.stringify({ message: '数据接收成功', data: params, code: 1 }))
  //     } catch (err) {
  //       res.writeHead(400, {'content-type': 'application/json; charset=utf-8'})
  //       res.end(JSON.stringify({ message: '获取失败', code: -1 }))
  //     }
  //   })
  // }
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // const reqData = parse(req.url, true)
  const filePath = join(__dirname, '/assets', req.url + '.png')
  console.log(filePath)
  fs.readFile(filePath, function(err, data) {
    if (!err) {
      res.writeHead(200)
      // console.log(data)
      res.end(data)
    } else {
      res.writeHead(400)
      res.end(err)
    }
  })
})
server.listen(3000, () => {
  console.log('开始启动3000端口的服务')
})