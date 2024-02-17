const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const KoaStatic = require('koa-static');
const routerConfig = require('../routerConfig.js');

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'hello';
});

routerConfig.forEach((config) => {
  const { pageName, routePath } = config;
  let pathReg = new RegExp(`CDN_PUBLICK_PATH_${pageName}\/*`, 'g');
  router.get(routePath, (ctx) => {
    let htmlStr = fs.readFileSync(path.resolve(__dirname, `../dist/${pageName}/index.html`), 'utf-8');
    const newhtmlStr = htmlStr.replace(pathReg, `http://localhost:3000${routePath || ''}`);

    ctx.type = 'html';
    ctx.body = newhtmlStr;
  });

  router.get(pathReg, (ctx) => {
    // 模糊匹配CDN_PUBLICK_PATH_静态资源,重定向至新url
    const url = ctx.req.url;
    const suffixPath = url.split(pathReg)?.at(-1) || '';
    const redirectUrl = `http://localhost:3000${routePath || ''}` + suffixPath;
    console.log('request', url, redirectUrl);
    ctx.status = 302;
    ctx.redirect(redirectUrl);
  });
});

// 注册路由
app.use(router.routes());
// 自动丰富 response 相应头，当未设置响应状态(status)的时候自动设置，在所有路由中间件最后设置(全局，推荐)，也可以设置具体某一个路由（局部），例如：router.get('/index', router.allowedMethods()); 这相当于当访问 /index 时才设置
app.use(router.allowedMethods());

app.use(KoaStatic(path.resolve(__dirname, `../dist`)));
// 静态文件托管

// handle 404 etc.
app.use(async (ctx, next) => {
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

app.listen(3000, () => {
  console.log('监听3000端口');
});
