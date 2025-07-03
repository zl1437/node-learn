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
        case '.md':
            contentType = 'text/html';
            break;
    }
    fs.readFile(filePath, async (err,content) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('Not Found');
        } else {
            const { marked } = await import('marked');
            const html = req.url.indexOf('.md') === -1 ? content : `
            <html>
                <head>
                <meta charset="utf-8">
                <title>Markdown 渲染</title>
                </head>
                <body>
                ${marked(content.toString())}
                </body>
            </html>
            `;
            console.log(req.url)
            res.writeHead(200, {'Content-Type': contentType});
            res.end(html, 'utf-8');
        }
    })
})

server.listen(3000, () => {
    console.log('server is running')
})
// server.close()