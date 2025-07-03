const http = require('http');
const request = http.request({hostname: '127.0.0.1', port: 3000},res => {
    console.log(res.statusCode)
    if(res.statusCode === 200) {
        console.log('请求成功')
        res.on('data', (data) => {
            console.log(data.toString())
        })
    } else {
        console.log('请求失败')
    }
})
request.on('error', (err) => {
    console.log('请求失败')
})
request.end()