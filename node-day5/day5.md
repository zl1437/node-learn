## 1. Express 与 Koa 对比

| 项目   | Express                                | Koa                |
| ---- | -------------------------------------- | ------------------ |
| 核心机制 | 基于回调函数（middleware: `(req, res, next)`） | 基于 `async/await`   |
| 内置功能 | 内置较多中间件如 `bodyParser`, `router` 等      | 极简核心，需要手动集成        |
| 使用场景 | 快速开发、功能丰富的社区生态                         | 更灵活、现代化的中间件机制，适合定制 |


## 2. Koa 中间件机制实现原理（洋葱模型）
```js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('中间件1开始');
  await next();
  console.log('中间件1结束');
});

app.use(async (ctx, next) => {
  console.log('中间件2开始');
  await next();
  console.log('中间件2结束');
});

app.use(async ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);
```
> 输出顺序：中间件1开始 → 中间件2开始 → Hello → 中间件2结束 → 中间件1结束


## 3. 常用中间件
- koa-router: 路由处理
- koa-body: 解析 POST 请求体（支持 JSON、form、multipart）
- koa-static: 提供静态资源服务

```bash
npm install koa-router koa-body koa-static
```

```
const Router = require('koa-router');
const koaBody = require('koa-body');
const serve = require('koa-static');

app.use(koaBody());
app.use(serve(__dirname + '/public'));
const router = new Router();

router.get('/api/hello', ctx => {
  ctx.body = { message: 'Hello World' };
});
app.use(router.routes());

```

## 简易博客系统 API 实现 的详细教程（simple-blog-api）

- 项目初始化
- 使用 Koa + koa-router + koa-body
- 接入 MongoDB（用 mongoose）
- 实现用户注册、登录、文章发布、评论等接口

## 第 1 步：初始化项目
```
mkdir simple-blog-api
cd simple-blog-api
npm init -y
```

```
npm install koa koa-router koa-body koa-static mongoose jsonwebtoken koa-jwt bcryptjs

```
- 开发时辅助工具：
```
npm install nodemon --save-dev
```

在 package.json 中添加脚本：
```
"scripts": {
  "dev": "nodemon index.js"
}
```

## 第 2 步：连接 MongoDB（使用 mongoose）
MongoDB 推荐使用本地服务或 MongoDB Atlas，确保已安装好 MongoDB。
**创建** db/index.js

// db/index.js
const mongoose = require('mongoose');

```
mongoose.connect('mongodb://127.0.0.1:27017/blog_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB 连接错误:'));
db.once('open', () => {
  console.log('✅ MongoDB 连接成功');
});

module.exports = mongoose;
```

## 第 3 步：项目目录结构

```
simple-blog-api/
├── db/
│   └── index.js
├── models/
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── routes/
│   ├── auth.js
│   ├── posts.js
│   └── comments.js
├── middleware/
│   └── auth.js
├── index.js
```

## 第 4 步：定义数据模型（Mongoose）
**用户模型：**models/User.js

```
const mongoose = require('../db');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// 注册前自动加密
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
```

**文章模型：**models/Post.js

```
const mongoose = require('../db');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
```

**评论模型：**models/Comment.js

```
const mongoose = require('../db');

const commentSchema = new mongoose.Schema({
  postId: mongoose.Schema.Types.ObjectId,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
```

## 第 5 步：中间件（JWT 验证）
**middleware/auth.js**

```
const jwt = require('koa-jwt');

const secret = 'my_secret';

module.exports = jwt({ secret });
module.exports.secret = secret; // 导出供签名使用
```

## 第 6 步：接口路由实现
**用户注册 & 登录 routes/auth.js**
```
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { secret } = require('../middleware/auth');

const router = new Router({ prefix: '/auth' });

// 注册
router.post('/register', async ctx => {
  const { username, password } = ctx.request.body;
  const existing = await User.findOne({ username });
  if (existing) {
    ctx.throw(400, '用户已存在');
  }
  const user = new User({ username, password });
  await user.save();
  ctx.body = { message: '注册成功' };
});

// 登录
router.post('/login', async ctx => {
  const { username, password } = ctx.request.body;
  const user = await User.findOne({ username });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    ctx.throw(401, '用户名或密码错误');
  }
  const token = jwt.sign({ username }, secret, { expiresIn: '1d' });
  ctx.body = { token };
});

module.exports = router;
```

**文章接口routes/posts.js**

```
const Router = require('koa-router');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = new Router({ prefix: '/posts' });

// 获取所有文章
router.get('/', async ctx => {
  const posts = await Post.find().sort({ createdAt: -1 });
  ctx.body = posts;
});

// 发表文章（需登录）
router.post('/', auth, async ctx => {
  const { title, content } = ctx.request.body;
  const author = ctx.state.user.username;
  const post = new Post({ title, content, author });
  await post.save();
  ctx.body = post;
});

module.exports = router;
```

**评论接口routes/comments.js**


```
const Router = require('koa-router');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = new Router({ prefix: '/comments' });

// 获取评论
router.get('/:postId', async ctx => {
  const comments = await Comment.find({ postId: ctx.params.postId });
  ctx.body = comments;
});

// 发表评论（需登录）
router.post('/:postId', auth, async ctx => {
  const { content } = ctx.request.body;
  const comment = new Comment({
    content,
    author: ctx.state.user.username,
    postId: ctx.params.postId
  });
  await comment.save();
  ctx.body = comment;
});

module.exports = router;
```

## 第 7 步：主入口 index.js

```
const Koa = require('koa');
const koaBody = require('koa-body');
const serve = require('koa-static');
const path = require('path');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = new Koa();
app.use(koaBody());
app.use(serve(path.join(__dirname, 'public')));

app.use(authRoutes.routes());
app.use(postRoutes.routes());
app.use(commentRoutes.routes());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
```


## 测试流程
- 注册用户
POST /auth/register
{ "username": "admin", "password": "123456" }

- 登录用户获取 token
POST /auth/login → 返回 { token: "..." }

- 发表文章（需 Authorization 头）
POST /posts
Headers: Authorization: Bearer <token>

- 获取所有文章
GET /posts

- 发表评论（带文章 ID）
POST /comments/:postId
Headers: Authorization: Bearer <token>










