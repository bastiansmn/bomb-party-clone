const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = "Hello world";
  
});

app.listen(4000);
