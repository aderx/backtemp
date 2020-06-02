
//获取监测点历史温度数据事件

const {dModel,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
    if(!d.uId && !d.devId) return false;

    putMsg('历史温度','接收到用户的历史温度查询请求');

    await dModel.findOne({devId:d.devId},(err,data) => {
        if(err){
            putMsg('历史温度',"查询事件遇到了一个错误。",err,1);
        }else{
            putMsg('历史温度',"已成功向数据库中查找一条监测点的历史温度!",data);
            if(data){
                if(!data.hidden && (data.option.openChart || data.uId === d.uId)){
                    back = [];
                    data.devHistory.forEach(item=>{
                        back.push({
                            temp:item.temp,
                            time:item.time
                        })
                    })
                }
            }
        }
    });

    return back;
};