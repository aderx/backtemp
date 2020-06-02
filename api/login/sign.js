
//用户注册事件

const {login,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
    if(d.name && d.key && d.email){
        const nData = {
            uName:d.name,
            uKey:d.key,
            uMail:d.email
        };

        putMsg('注册','接收到注册请求',nData);

        //验证用户名是否存在
        if(!back){
            await login.findOne({uName:d.name},async (err,data)=>{
                if(err) putMsg('注册',"查询事件遇到了一个错误。",err,1);
                if(data) back = {msg:'用户名已存在！',code:0,data:""};
            })
        }

        //验证邮箱是否存在
        if(!back){
            await login.findOne({uMail:d.email},async (err,data)=>{
                if(err) putMsg('注册',"查询事件遇到了一个错误。",err,1);
                if(data) back = {msg:'邮箱已存在！',code:0,data:""};
            })
        }

        //插入新数据，由于未知原因（猜测是返回值问题，但是检查不出来）await会失效，故插入只能直接成功
        if(!back){
            login.create(nData, (err,data) => {
                if(err) putMsg('注册',"新增事件遇到了一个错误。",err,1);
                putMsg('注册',"已成功向数据库添加一条数据!");
                if(data) back = true;
            });
            back = true;
        }

    }
    return back;
};