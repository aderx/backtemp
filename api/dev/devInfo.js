
//获取监测点详细信息事件

const {dModel,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
    if(!d.uId && !d.devId) return false;

    putMsg('监测点信息','接收到用户的查询请求');

    //根据环境ID，找到匹配环境，判断是否公开或者是否为对应用户，是就返回数据
    await dModel.findOne({devId:d.devId},(err,data) => {
        if(err){
            putMsg('监测点信息',"查询事件遇到了一个错误。",err,1);
        }else{
            putMsg('监测点信息',"已成功向数据库中查找一条监测点信息!",data);
            if(data){
                if(!data.hidden && (data.option.showAllUser || data.uId === d.uId)){
                    let d = data;
                    back = {
                        devId:d.devId,
                        envId:d.envId,
                        uId:d.uId,
                        info:{
                            name:d.info.name,
                            msg:d.info.msg,
                            hCode:d.info.hCode
                        },
                        limit:{
                            min:d.limit.min,
                            max:d.limit.max
                        },
                        show:{
                            beginTime:d.show.beginTime,
                            temp:d.show.temp,
                            highestTemp:d.show.highestTemp,
                            lowestTemp:d.show.lowestTemp,
                        },
                        option:{
                            showAllUser:d.option.showAllUser,
                            run:d.option.run,
                            openChart:d.option.openChart
                        },
                    }
                }
            }
        }
    });

    return back;
};