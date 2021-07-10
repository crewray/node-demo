var Koa = require('koa');
var app = new Koa();
require('./connect.js')

var koaStatic = require('koa-static');
app.use(koaStatic(__dirname + '/static'));

var cors=require('./util')
app.use(cors)

var router = require('./router')
var koaBody = require('koa-body');
app.use(koaBody());

var request=require('./request')
app.use(request)

app.use(router.routes())


app.listen(8888, function () {
    console.log('服务已启动, 在http://localhost:8888')
})