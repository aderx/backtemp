
//刷新时间事件

const {login,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
    if(d.uId && d.time){

        putMsg('刷新时间','接收到用户的修改刷新时间请求');
        //查找并更新数据刷新时间
        await login.updateOne({uId:d.uId},{dTime:d.time},(err,data) => {
            if(err){
                putMsg('刷新时间',"查询事件遇到了一个错误。",err,1);
            }else{
                putMsg('刷新时间',"已成功向数据库中修改用户数据刷新时间!",data);
                data ? back = true : false;
            }
        });
        back = true;
    }

    return back;
};