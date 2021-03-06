const Koa = require('koa'),
    koa = new Koa(),
    koaBody = require('koa-body'),
    cors = require('koa2-cors'),
    path = require('path'),
    SwaggerExtra = require('swagger-extra'),
    swaggerExtra = new SwaggerExtra(
        path.join(__dirname, 'config', 'controller'),
        path.join(__dirname, 'controller'),
        {
            isAutoFixControllersOpen: true,
            isSwaggerOpen: true,
            postBodyGetCode: 'ctx.request.body',
            getParamsGetCode: 'ctx.params',
            controllerReturnCode: 'ctx.body = {code: 200,};'
        },
    );

koa.use(koaBody({ multipart: true }));
// koa.use(cors({
//     origin: function (ctx) {
//         if (ctx.url === '/test') {
//             return "*";
//         }
//         return "*";
//     },
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//     maxAge: 5,
//     credentials: true,
//     allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }));


// koa.use(async (ctx,next)=>{
//     console.log(ctx.url, JSON.stringify(ctx.request.body|| {}), JSON.stringify(ctx.request.param || {}));
//     await next();
//     console.log(JSON.stringify(ctx.body));
// });

koa.use(swaggerExtra.getRoutes());


koa.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

koa.listen(9999);

let redis = require("redis");
redis.createClient()
require('fs').readFileSync