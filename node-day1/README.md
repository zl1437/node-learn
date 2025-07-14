# node 学习日志

## Day 1 - Node 基础入门

- 安装 Node.js、配置 nvm、npm/yarn/pnpm 使用
- 了解事件循环机制
- 掌握核心模块：fs、path、http、url、events
- 简单搭建 HTTP 服务，返回 HTML

练习：
写一个静态文件服务器，支持 GET 请求返回 HTML/CSS/JS 文件

## Day 2 - 模块化与异步编程

- CommonJS vs ESModule
- require、import、exports、模块缓存机制
- 回调、Promise、async/await
- util.promisify、错误处理模式

练习：
封装一个读取本地文件的工具库，支持 Promise/async 使用

## Day 3 - Express 基础使用

- 路由、静态资源、请求参数、响应处理
- 中间件机制、日志、错误处理
- 使用 nodemon、morgan

练习：
构建一个 RESTful API，包含增删改查（模拟内存数据）

## Day 4 - Koa 进阶与中间件机制

- 对比 Express 与 Koa（底层基于 async/await）
- 自定义中间件机制
- koa-router、koa-body、koa-static 等常用中间件

练习：
使用 Koa 模拟实现博客接口服务，带简单认证逻辑（JWT）

## Day 5 - 项目实战：简易博客系统（API 层）

- 项目结构拆分（MVC）
- 接入 MongoDB（使用 mongoose）
- 用户注册、登录、发表文章、评论接口

## Day 6 - 性能调试与错误处理

- console、debug、node-inspect 调试
- try/catch、全局异常处理、async 错误处理技巧
- 性能分析工具（如 clinic.js, 0x）

## Day 7 - 项目复盘 + 测试

- 使用 jest 编写接口单元测试
- 使用 supertest 测试 API 接口

小结本周所学内容，提交完整博客服务项目代码

## 🗓️ 第 2 周：高级应用 + SEO + 安全 + 部署

## Day 8 - SSR 渲染基础（处理 SEO）

- CSR vs SSR vs 静态生成（SSG）
- 使用 express + vue-server-renderer 或 next.js SSR 实现
- SEO 支持点：meta 渲染、link canonical、爬虫识别处理
- 对比使用 puppeteer + html2canvas 模拟预渲染

练习：
实现一个 SSR 的简易文章页，可爬取、可预览

## Day 9 - 常见项目问题处理

- 跨域问题处理（CORS、中间件设置）
- 文件上传、表单处理（使用 multer 或 formidable）
- 日志收集（使用 winston、log4js）
- Node 内存泄漏与排查技巧

## Day 10 - 安全问题处理

常见漏洞防护：XSS、CSRF、SQL 注入
使用 Helmet 增加 HTTP 安全头
防暴力破解/接口限流（express-rate-limit）
JWT 的安全使用注意事项

## Day 11 - 性能优化技巧

- 接口缓存（Redis、Memory Cache）
- 使用 cluster 模块实现多进程
- 结合 PM2 实现负载均衡与健康重启
- 前后端分离架构下 Node 作为中间层如何做优化

## Day 12 - 服务部署实战

- 使用 PM2 部署 Node 服务，配置生态文件
- 使用 Docker 封装 Node 项目
- Nginx + Node 服务部署配置
- CI/CD 简介（GitHub Actions、Jenkins）

## Day 13 - 模拟面试 & 高阶总结

- 常见高级面试题演练
- Node 如何处理高并发？
- 中间件机制如何实现？
- 如何设计一个高可用的 API 服务？
- 总结常见代码片段和面试技巧

## Day 14 - 最终实战项目输出

- 项目建议：SSR 支持的内容型网站 + CMS 后台接口
  包含：

- 登录鉴权（JWT）
- SSR 渲染支持（SEO）
- API 接口封装
- 安全优化与部署支持
