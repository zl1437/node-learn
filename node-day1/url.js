const url = require('url');

const urlObj = url.parse('http://127.0.0.1:3000/?name=123&age=18',true)

console.log(urlObj.query.name)

const urlStr = url.format(urlObj)

console.log(urlStr)