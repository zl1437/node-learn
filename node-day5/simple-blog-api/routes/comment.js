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
