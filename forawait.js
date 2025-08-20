// 有一个 for 循环，在里面用 await 执行异步操作，但循环结束后还要再调用一个方法（可能依赖前面循环执行的结果）。

// 1. 顺序执行 + 循环结束后调用
// 如果循环里的 await 必须按顺序一个一个执行，可以这样写：
// async function run() {
//   const tasks = [];
//   console.time('run')

//   for (let i = 0; i < 5; i++) {
//     tasks.push(doSomething(i)); // 不等待，直接收集任务
//   }
  
//   await Promise.all(tasks); // 等所有任务都完成

//   console.timeEnd('run')
//   await afterLoop();
// }


// 2. 并行执行 + 循环结束后调用
// 如果循环里的任务互不依赖，可以用 Promise.all 同时执行，最后再调用方法：
// 这样会同时执行所有任务，速度更快。
async function run() {
  console.time('run')

  for (let i = 0; i < 5; i++) {
    await doSomething(i)
  }
  console.timeEnd('run')
  await afterLoop();
}

async function doSomething(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`完成任务 ${num}`);
      resolve();
    }, 500);
  });
}

async function afterLoop() {
  console.log('所有任务完成后调用');
}

run();

// 总结选择：
// 任务必须按顺序执行 → 写在 for 里直接 await
// 任务可以并行执行 → 用 Promise.all 收集后统一等待