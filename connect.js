// 数据库连接模块, 不使用module.exports,模块被require便被直接执行

// 导入mongoose模块
const mongoose = require('mongoose');
// 连接数据库,第一个参数为数据库地址(如果是远程数据库,修改地址即可),第二参数为对象,为了消除警告信息
mongoose.connect('mongodb://localhost/hero', { useNewUrlParser: true, useUnifiedTopology: true });
// 获取连接对象,为了监听连接情况,后面这几行代码不要也可以,不过不要就无法知道连接是否成功
var db = mongoose.connection;
db.on('error', function (err) {
  console.log('数据库连接失败', err);
});
db.once('open', function () {
  console.log('数据库连接成功');
}); 