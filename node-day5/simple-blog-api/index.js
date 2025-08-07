const Koa = require('koa');
const koaBody = require('koa-body').default;
const serve = require('koa-static');
const path = require('path');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comment');

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