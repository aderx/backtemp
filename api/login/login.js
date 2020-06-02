
//用户登录事件

const {login,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
    if(d.name && d.key){
        const nData = {
            uName:d.name,
            uKey:d.key
        };

        putMsg('登录','接收到用户的登录请求',nData);
        //查找用户是否存在
        await login.findOne(nData,(err,data) => {
            if(err){
                putMsg('登录',"查询事件遇到了一个错误。",err,1);
            }else{
                putMsg('登录',"已成功向数据库中查找一条用户信息!",data);
                data ? back = {
                    name:data.uName,
                    id:data.uId,
                    dTime:data.dTime
                } : false;
            }
        });
    }

    return back;
};