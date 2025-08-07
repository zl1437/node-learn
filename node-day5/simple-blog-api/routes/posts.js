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
router.post('/article', auth, async ctx => {
  const { title, content } = ctx.request.body;
  const author = ctx.state.user.username;
  const post = new Post({ title, content, author });
  await post.save();
  ctx.body = post;
});

module.exports = router;