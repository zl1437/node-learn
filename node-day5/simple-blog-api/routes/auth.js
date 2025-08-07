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