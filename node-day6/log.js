// console.log('普通输出');
// console.info('信息');
// console.warn('警告');
// console.error('错误');
// console.trace('堆栈跟踪');
// console.time('label'); // 开始计时
// // ...代码
// console.timeEnd('label'); // 结束计时


const debug = require('debug')('app:main');

debug('服务已启动');