const jwt = require('koa-jwt');

const secret = 'my_secret';

module.exports = jwt({ secret });
module.exports.secret = secret; // 导出供签名使用