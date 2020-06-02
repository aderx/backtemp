/*************************************************************************************************/
/*****************************************服务器基础服务插件***************************************/
/*************************************************************************************************/

//koa - 基础框架
const koa = require('koa');
const app = new koa();

//koa-bodyparser - 获取post数据体框架
const parser = require('koa-bodyparser');
app.use(parser());

//koa-router - 基础路由
const Router = require('koa-router');
const router = new Router();

//koa-static - koa静态数据地址
const Static = require('koa-static');
app.use(Static(__dirname + '/public'));

//fs - node文件流
const fs = require('fs');

//koa-cors - 允许跨域操作
/*const cors = require('koa2-cors');
app.use(cors({
    orign:(ctx)=>{
        ctx.set("Access-Control-Allow-Origin", "http://192.168.1.6:8080")
    }
}));*/

/*************************************************************************************************/
/***************************************接口地址获取与基础服务*************************************/
/*************************************************************************************************/

//API接口地址获取
const api = {
    __data__:{
        host:"api",
        login:"login",
        env:"env",
        dev:"dev",
        data:"data"
    },
    login(next){
        return './' + this.__data__.host + '/' + this.__data__.login + '/' + next;
    },
    env(next){
        return './' + this.__data__.host + '/' + this.__data__.env + '/'+ next;
    },
    dev(next){
        return './' + this.__data__.host + '/' + this.__data__.dev + '/'+ next;
    },
    data(next){
        return './' + this.__data__.host + '/' + this.__data__.data + '/'+ next;
    },
    get host(){
        return this.__data__.host;
    }
};
let count = 1;

function getApi(next){
    return '/' + api.host + '/' + next
}

function back(val,code,msg){
    console.log(count++,'['+new Date().toLocaleString()+']','[首页] 接收到已经过处理，并将返回给前台的data值',val instanceof Array ? val.length +'条':val);
    //返回值不存在或为假
    if(val instanceof Object && (val.code || val.msg)){
        return {
            code: (val.code===undefined) ? 200 : val.code,
            msg: val.msg || "success",
            data: val.data || ""
        }
    }else if(val){
        return {
            code:code || 200,
            msg:msg || "success",
            data:val || ""
        }
    }else {
        return {
            code:0,
            msg:"No Data Or Search Failed!",
            data:""
        }
    }
}

//首页
router.get('/', (ctx) => {
    ctx.response.type = "text/html";
    ctx.body = fs.createReadStream('./public/index.html');
});

/*************************************************************************************************/
/*****************************************用户登录与注册模块***************************************/
/*************************************************************************************************/

router
    .post(getApi('login'), async (ctx) => {
        //用户登录
        const mod = require(api['login']('login'));
        ctx.body = back(await mod(ctx.request.body));
    })
    .post(getApi('sign'), async (ctx) => {
        //用户注册
        const mod = require(api['login']('sign'));
        ctx.body = back(await mod(ctx.request.body));
    })
    .post(getApi('setTime'),async (ctx) => {
        //数据刷新时间
        const mod = require(api['login']('setTime'));
        ctx.body = back(await mod(ctx.request.body));
    })
;

/*************************************************************************************************/
/******************************************监测环境管理模块****************************************/
/*************************************************************************************************/

router
    .post(getApi('envList'),async (ctx) => {
        //获取环境列表 ， 后端返回所有开放结点
        const mod = require(api['env']('envList'));
        ctx.body = back(await mod(ctx.request.body));
    })
    .post(getApi('envInfo'),async (ctx) => {
        //获取单个环境具体信息
        const mod = require(api['env']('envInfo'));
        ctx.body = back(await mod(ctx.request.body));
    })
    .post(getApi('envAdd'),async (ctx) => {
        //添加新环境
        const mod = require(api['env']('envAdd'));
        ctx.body = back(await mod(ctx.request.body));
    })
    .post(getApi('envEdit'),async (ctx) => {
        //修改环境信息
        const mod = require(api['env']('envEdit'));
        ctx.body = back(await mod(ctx.request.body));
    })
    .post(getApi('envDel'),async (ctx) => {
        //环境删除操作
        const mod = require(api['env']('envDel'));
        ctx.body = back(await mod(ctx.request.body));
    })
;

/*************************************************************************************************/
/*****************************************监测点设备管理模块***************************************/
/*************************************************************************************************/

router
    .post(getApi('devList'),async (ctx) => {
        //获取监测点设备列表
        const mod = require(api['dev']('devList'));
        ctx.body = back(await mod(ctx.request.body));
    })
    .post(getApi('devInfo'), async (ctx) => {
        //获取单个设备信息
        const mod = require(api['dev']('devInfo'));
        ctx.body = back(await mod(ctx.request.body));
    })
    .post(getApi('devAdd'),async (ctx) => {
        //添加监测点
        const mod = require(api['dev']('devAdd'));
        ctx.body = back(await mod(ctx.request.body));
    })
    .post(getApi('devEdit'),async (ctx) => {
        //监测点信息修改
        const mod = require(api['dev']('devEdit'));
        ctx.body = back(await mod(ctx.request.body));
    })
    .post(getApi('devDel'),async (ctx) => {
        //监测点删除操作
        const mod = require(api['dev']('devDel'));
        ctx.body = back(await mod(ctx.request.body));
    })
    .post(getApi('devStatus'),async (ctx) => {
        //监测点状态修改
        const mod = require(api['dev']('devStatus'));
        ctx.body = back(await mod(ctx.request.body));
    })
;

/*************************************************************************************************/
/*****************************************监测点其他信息模块***************************************/
/*************************************************************************************************/

//获取单个设备图表数据
router.post(getApi('getChart'),async (ctx) => {
    const mod = require(api['dev']('getChart'));
    ctx.body = back(await mod(ctx.request.body));
});

/*************************************************************************************************/
/******************************************硬件数据交互模块****************************************/
/*************************************************************************************************/

//温度数据获取（HARD）
router.post(getApi('setTemp'),async (ctx,next) => {
    const mod = require(api['data']('setTemp'));
    ctx.body = back(await mod(ctx.request.body));
});

/*20s创建一个虚拟数据*/
let nowNum = 16;
setInterval(()=>{
    let randomTemp = (Math.random()*40).toFixed(1);
    const mod = require(api['data']('setTemp'));
    mod({code:nowNum,temp:randomTemp});
    nowNum++;
    if(nowNum === 20){
        nowNum = 16;
    }
},20000);

/*************************************************************************************************/
/****************************************端口监听与服务器处理**************************************/
/*************************************************************************************************/

app
    .use(router.routes())
    .use(router.allowedMethods())
    .on('error',(err,ctx) => {
        ctx.body = "502,服务器错误!";
        console.log("MEET ERR:" + err);
    });


app.listen(3000,() => {
    console.log('['+new Date().toLocaleString()+']',"System is listening in http://127.0.0.1:3000");
});