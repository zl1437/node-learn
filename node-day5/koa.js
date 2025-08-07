const Router = require('koa-router');
const koaBody = require('koa-body').default;
const serve = require('koa-static');
const jwt = require('jsonwebtoken');
const secret = 'my_secret';
const Koa = require('koa');
const app = new Koa();

app.use(koaBody());
app.use(serve(__dirname + '/public'));
const router = new Router();
app.use(router.routes());
// 认证中间件
const jwtMiddleware = require('koa-jwt')({ secret });

router.post('/login', ctx => {
  const { username, password } = ctx.request.body;
  if (username === 'admin' && password === '123') {
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
    ctx.body = { token };
  } else {
    ctx.status = 401;
    ctx.body = { error: '认证失败' };
  }
});


router.get('/protected', jwtMiddleware, ctx => {
  console.log(ctx.state)
  ctx.body = { data: '受保护的数据', user: ctx.state.user };
});

// ✅ 启动服务
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});