# Day 2：模块化与异步编程

## 🎯 今日目标

- 理解 Node.js 的模块系统（CommonJS 与 ESModule 的差异）
- 掌握模块导入导出、包管理、模块缓存机制
- 学会使用异步编程（Callback → Promise → async/await）
- 熟练处理异步流程控制，避免回调地狱
- 编写可复用的工具模块和结构化项目代码

---

## 📚 理论学习

### 1️⃣ Node.js 模块系统

#### CommonJS 示例：

```js
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// index.js
const { add } = require("./math");
console.log(add(2, 3));
```

#### ESModule 示例（需配置 "type": "module" 或使用 .mjs）：

```js
// math.mjs
export function add(a, b) {
  return a + b;
}

// index.mjs
import { add } from "./math.mjs";
console.log(add(2, 3));
```

---

### 2️⃣ 模块缓存机制

```js
// test.js
console.log("模块被执行了一次");
module.exports = {};
```

多次 `require('./test')`，只输出一次。

---

### 3️⃣ npm 包管理

常用命令：

```bash
npm init -y
npm install axios
npm uninstall xxx
```

文档：[npm CLI](https://docs.npmjs.com/cli/v9)

---

### 4️⃣ 异步编程方式

#### ✅ Callback

```js
fs.readFile("./data.txt", "utf8", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

#### ✅ Promise

```js
const fs = require("fs").promises;
fs.readFile("./data.txt", "utf8")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

#### ✅ Async / Await

```js
const fs = require("fs").promises;

async function readData() {
  try {
    const data = await fs.readFile("./data.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
readData();
```

---

## 🛠️ 实践项目：封装文件读取模块

```
project/
├── app.js
├── utils/
│   └── file.js
```

#### `file.js`：

```js
const fs = require("fs").promises;

async function readFileAsync(path) {
  return await fs.readFile(path, "utf8");
}

module.exports = { readFileAsync };
```

#### `app.js`：

```js
const { readFileAsync } = require("./utils/file");

(async () => {
  const content = await readFileAsync("./data.txt");
  console.log("文件内容:", content);
})();
```

---

## 🧪 练习题

1. 创建一个模块 `math.js`，暴露 `add/subtract/multiply/divide` 方法，并在另一个文件中调用。
2. 使用 `require()` 加载 3 次一个模块，观察是否重复执行。
3. 封装一个 `readFilesInOrder` 函数，按顺序读取多个文件（如 file1.txt, file2.txt, file3.txt），并将内容拼接后输出。
4. 使用 `Promise.all()` 实现多个文件并行读取，输出所有内容。
5. 将 `fs.readFile` 用 `util.promisify` 封装为 Promise 形式：
   ```js
   const util = require("util");
   const fs = require("fs");
   const readFile = util.promisify(fs.readFile);
   ```

---

## 📚 拓展资料

- [Node.js 模块机制解析](https://juejin.cn/post/6844903613584658446)
- [异步编程方式总结](https://juejin.cn/post/7092126927098488852)
- B 站推荐：「Node.js 模块机制原理讲解」：[https://www.bilibili.com/video/BV1Vz4y1M7zF](https://www.bilibili.com/video/BV1Vz4y1M7zF)

---

## ✅ 今日 Checklist

| 项目                                  | 完成情况 |
| ------------------------------------- | -------- |
| 掌握 CommonJS / ESModule 模块导入导出 | ✅       |
| 熟悉 npm 管理模块                     | ✅       |
| 理解模块缓存机制                      | ✅       |
| 掌握 Promise / async/await 用法       | ✅       |
| 封装异步模块工具                      | ✅       |
