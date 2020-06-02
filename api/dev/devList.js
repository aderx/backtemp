
//获取监测设备列表事件

const {dModel,putMsg} = require('../../mongodb');

module.exports = async function(d){

    let back = [];

    if(!d.uId || !d.envId) return false ;

    putMsg('设备列表','接收到用户的查询请求');

    //查找所有用户，然后再循环判断
    await dModel.find({},(err,data) => {
        if(err){
            putMsg('设备列表',"查询事件遇到了一个错误。",err,1);
        }else{
            putMsg('设备列表',"已成功向数据库中查找所有设备信息!");
            //输出条件：必要、监测点未被删除 并且环境ID为当前环境，可选1、是当前用户添加的 2、开放的
            let nData = data.filter(item=>{
                return (!item.hidden && item.envId === d.envId && (item.uId === d.uId || item.option.showAllUser));
            });
            nData.forEach(d=>{
                back.push({
                    devId:d.devId,
                    envId:d.envId,
                    uId:d.uId,
                    info:{
                        name:d.info.name,
                        msg:d.info.msg,
                    },
                    limit:{
                        min:d.limit.min,
                        max:d.limit.max
                    },
                    show:{
                        beginTime:d.show.beginTime,
                        temp:d.show.temp,
                    },
                    option:{
                        run:d.option.run,
                    },
                })
            })
        }
    });

    return back;
};