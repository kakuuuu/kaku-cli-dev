const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const KoaStatic = require('koa-static');
const routerConfig = require('../routerConfig.json');

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'hello';
});

routerConfig.forEach((config) => {
  const { pageName, routePath } = config;
  const pathReg = new RegExp(`CDN_PUBLICK_PATH_${pageName}\/*`, 'g');
  router.get(routePath, (ctx) => {
    console.log('pageName', pageName, ctx.req.url);
    const htmlStr = fs.readFileSync(
      path.resolve(__dirname, `../dist/${pageName}/index.html`),
      'utf-8'
    );
    const newhtmlStr = htmlStr.replace(pathReg, `http://localhost:3001${routePath || ''}`);

    ctx.type = 'html';
    ctx.body = newhtmlStr;
  });

  router.get(pathReg, (ctx) => {
    // 模糊匹配CDN_PUBLICK_PATH_静态资源,重定向至新url
    const url = ctx.req.url;
    const suffixPath = url.split(pathReg)?.at(-1) || '';
    const redirectUrl = `http://localhost:3001${routePath || ''}` + suffixPath;
    console.log('request', url, redirectUrl);
    ctx.status = 302;
    ctx.redirect(redirectUrl);
  });
});

// 注册路由
app.use(router.routes());
// 自动丰富 response 相应头，当未设置响应状态(status)的时候自动设置，在所有路由中间件最后设置(全局，推荐)，也可以设置具体某一个路由（局部），例如：router.get('/index', router.allowedMethods()); 这相当于当访问 /index 时才设置
app.use(router.allowedMethods());

app.use(
  KoaStatic(path.resolve(__dirname, `../dist`), {
    index: false
  })
);
// 静态文件托管

app.use(async (ctx, next) => {
  // console.log('ctx', ctx);
  console.log('测试中间件1_pre');
  await next();
  console.log('测试中间件1_after_next');
});

// handle 404 etc.
app.use(async (ctx, next) => {
  // console.log('ctx', ctx);
  try {
    await next();
    if (ctx.status === 404) {
      ctx.body = '404错误';
      // do somthing here
    }
  } catch (err) {
    // handle error
  }
});

app.listen(3001, () => {
  console.log('监听3001端口');
});
