const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer((req,res) => {
    let filePath = path.join(__dirname, 'page', req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';
    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
    }
    fs.readFile(filePath, (err,content) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('Not Found');
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
        }
    })
})

server.listen(3000, () => {
    console.log('server is running')
})
// server.close()