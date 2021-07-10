// 1.导入koa-router
var Router = require('koa-router');


mongoose = require('mongoose')
// 创建用户数据结构, 就是一条数据,拥有哪些字段(属性)
var heroSchema = mongoose.Schema({
    name: '',
    class: '',
});

var heroModel=mongoose.model('Hero',heroSchema)



// 2.创建一个router对象
var router = new Router();
// 3.创建路由
router.all('/getList', async function (ctx) {
    try {
        var query=ctx.params
        
        var data=await heroModel.find(query)
        ctx.body={
            code:666,
            msg:'获取成功',
            data:data
        }
        
    } catch (error) {
        ctx.body={
            code:500,
            msg:'添加失败',
            error:error
        }
    }
})
router.get('/getDetail', async function (ctx) {
    try {
        var query=ctx.params
        console.log(query)
        var data=await heroModel.findOne(query)
        ctx.body={
            code:666,
            msg:'获取成功',
            data:data
        }
        
    } catch (error) {
        ctx.body={
            code:500,
            msg:'找不到英雄id',
            error:error
        }
    }
})
router.all('/add', async function (ctx) {
    
    try {
        var data=ctx.params
        var model=new heroModel(data)
        var result=await model.save()
        console.log(result)
        ctx.body={
            code:666,
            msg:'添加成功',
            result:result
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:'添加失败',
            error:error
        }
    }

    
})
router.all('/del', async function (ctx) {
    try {
        var params=ctx.params
        console.log(params._id)
        if(params._id)
            var result = await heroModel.deleteOne({_id: params._id})
        
        if(params.list){
            var result=await heroModel.deleteMany({_id:{$in:params.list}})
            console.log(result)
        }
        ctx.body={
            code:666,
            msg:'删除成功',
            result:result           
        }
    } catch (error) {
        console.log(error);
        ctx.body={
            code:500,
            msg:'删除失败',
            error:error
        }
    }
});
router.all('/update', async function (ctx) {
    try {
        var params=ctx.params
        
        if(params._id)
            var result = await heroModel.updateOne({_id: params._id},params)
        ctx.body={
            code:666,
            msg:'更新成功',
            result:result           
        }
    } catch (error) {
        console.log(error);
        ctx.body={
            code:500,
            msg:'更新失败',
            error:error
        }
    }
});

// 导出路由对象
module.exports = router;