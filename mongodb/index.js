
//数据库配置文件

const mongoose = require('mongoose'),getval="abcdefghijklmnopqrsvwxyz0123456789".split("");
mongoose.connect(
    'mongodb://127.0.0.1:27017/temperature',
    {useNewUrlParser:true,useUnifiedTopology:true},
    (err) => {
        if(err){
            putMsg('数据库',"数据库链接时遇到了一些问题。",err,1);
        }else{
            putMsg('数据库',"数据库连接成功！");
        }
    }
);

//伪唯一ID
let counter = 0;
let CountedId = {type: String, default: () => {
        let randomVal = '',num = 5;
        while(num--){
            randomVal += getval[Math.floor(Math.random()*getval.length)]
        }
        return 'D-' + randomVal +'t' +counter++
    }};

//监测设备数据规格
const dataModel = new mongoose.Schema({
    devId:CountedId,
    envId:String,
    uId:String,
    info:{
        name: String,
        msg: String,
        hCode:String,
    },
    limit:{
        min:{type:Number,default:-Infinity},
        max:{type:Number,default:Infinity}
    },
    show:{
        beginTime:{type:Date,default:''},//监测点开始运行时间
        temp:{type:Number,default:0},
        highestTemp: {type:Number,default:-Infinity},//历史最高温度
        lowestTemp: {type:Number,default:Infinity},//历史最低温度
    },
    option:{
        run:{type:Boolean,default:true},
        showAllUser:{type:Boolean,default:true},
        openChart: {type:Boolean,default:true},
    },
    hidden:{type:Boolean,default:false},
    devHistory:[{
        time:{type:Date,default:new Date()},
        temp:{type:Number,default:0}
    }]
});

//计算一个唯一用户ID，伪顺序
let counter1 = 0;
let CountedId1 = {type: String, default: () => {
    let randomVal = '',num = 5;
    while(num--){
        randomVal += getval[Math.floor(Math.random()*getval.length)]
    }
    return 'U-' + randomVal +'t' +counter1++
}};

//用户数据规格
const loginModel = new mongoose.Schema({
    uName:String,
    uKey:String,
    uId:CountedId1,
    uMail:String,
    dTime:{type:Number,default:10000}//单位 毫秒
});

//计算一个唯一用户ID，伪顺序
let counter2 = 0;
let CountedId2 = {type: String, default: () => {
        let randomVal = '',num = 5;
        while(num--){
            randomVal += getval[Math.floor(Math.random()*getval.length)]
        }
        return 'E-' + randomVal +'t' +counter2++
    }};

//环境数据规格
const envModel = new mongoose.Schema({
    envId:CountedId2,
    info:{
        name:String,
        desc:String,
        link:{type:String,default:''},
        icon:String,
        color:String
    },
    limit:{
        min:{type:Number,default:-Infinity},
        max:{type:Number,default:Infinity}
    },
    option:{
        showAllUser:{type:Boolean,default:true},
        line:{type:Boolean,default:true},
        area:Number
    },
    child:[String], //存储监测点ID
    hidden:{type:Boolean,default:false},
    uId:String //创建者ID
});

const eModel = mongoose.model("envInfo" , envModel);//环境数据库

const dModel = mongoose.model('deviceInfo' , dataModel);//监测点数据库

const login = mongoose.model("user" , loginModel);//用户信息数据库

function putMsg(page,msg,data,code){
    let now = '['+new Date().toLocaleString()+']';
    if(code === 1){
        if(!data){
            console.log('***'+now,'['+page+'] '+msg);
        }else if(!msg){
            console.log('***'+now,'['+page+'] 未详细定义的错误！',data)
        }else{
            console.log('***'+now,'['+page+'] '+msg,data)
        }
    }else{
        if(!data){
            console.log(now,'['+page+'] '+msg);
        }else if(!msg){
            console.log(now,'['+page+'] 未详细定义的请求！',data)
        }else{
            console.log(now,'['+page+'] '+msg,data)
        }
    }


}

//导出模块
module.exports = {
    login,
    dModel,
    eModel,
    putMsg
};


