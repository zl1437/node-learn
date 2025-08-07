## Day 6 - 性能调试与错误处理
### 学习目标
- 掌握 Node.js 的调试技巧（console、debug、node-inspect）
- 理解同步/异步的错误处理方式及最佳实践
- 熟练使用性能分析工具如 clinic.js、0x 等找出性能瓶颈
- 能定位和修复常见的内存泄漏和性能问题

## 1. Node.js 调试方式
### 1.1 使用 console 系列方法调试（基础但常用）

```
console.log('普通输出');
console.info('信息');
console.warn('警告');
console.error('错误');
console.trace('堆栈跟踪');
console.time('label'); // 开始计时
// ...代码
console.timeEnd('label'); // 结束计时
```

### 1.2 使用 debug 模块（推荐用于生产日志）
安装：

```
npm install debug
```

使用：

```
// app.js
const debug = require('debug')('app:main');

debug('服务已启动');
```

### 1.3 使用 node inspect 进行调试

```
node inspect app.js
```

```
node --inspect-brk app.js
```

## 2. 错误处理机制
### 2.1 try/catch 用于同步代码

```
try {
  JSON.parse('invalid json');
} catch (err) {
  console.error('解析失败:', err.message);
}
```

### 2.2 异步错误处理：async/await
```
const getData = async () => {
  try {
    const res = await fetchData();
    console.log(res);
  } catch (err) {
    console.error('请求出错：', err.message);
  }
};
```
###  2.3 Koa 中的错误处理中间件

```
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
    console.error('全局错误：', err);
  }
});
```

### 2.4 捕获未处理异常和未处理 Promise

```
process.on('uncaughtException', err => {
  console.error('未捕获异常:', err);
});

process.on('unhandledRejection', err => {
  console.error('未处理的 Promise:', err);
});
```

##  3. 性能分析工具
### 3.1 clinic.js（官方推荐）
安装：

```
npm install -g clinic
```
使用：

```
clinic doctor -- node app.js
```

使用完后它会自动打开 HTML 报告。
>可用于分析：事件循环滞后、内存泄漏、CPU 开销高等问题。

### 3.2 0x：火焰图分析（Flamegraph）

```
npm install -g 0x
```

使用：

```
0x app.js
```

运行完会生成火焰图报告（SVG 格式），非常适合分析耗时函数调用栈。
***

### 3.3 内存快照与堆分析（使用 Chrome DevTools）

```
node --inspect app.js
```

然后在 chrome://inspect 中连接，打开 **Memory** 面板可进行：

- Heap snapshot（堆快照）

- Allocation instrumentation（内存分配）

- Detect detached DOM trees（内存泄漏检测）

###  Demo 示例：制造 CPU 性能问题

```
// heavy.js
function heavy() {
  let total = 0;
  for (let i = 0; i < 1e9; i++) {
    total += i;
  }
  return total;
}

console.time('heavy');
console.log(heavy());
console.timeEnd('heavy');
```

```
clinic doctor -- node heavy.js
```
或者直接本地打开
```
clinic doctor --on-port 'autocannon localhost:3000' -- node heavy.js
```

| 任务                                   | 目标                      |
| ------------------------------------ | ----------------------- |
| ✅ 使用 `debug` 和 `console` 为博客项目添加调试信息 | 掌握 debug 使用方法           |
| ✅ 制造一个错误在 Koa 项目中触发并全局捕获             | 熟悉 try/catch 和 ctx 处理方式 |
| ✅ 使用 `clinic doctor` 对博客项目进行一次性能检测   | 掌握诊断流程                  |
| ✅ 用 `0x` 捕获一次 CPU-heavy 的堆栈火焰图       | 练习火焰图解读                 |


