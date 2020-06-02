
//修改监测点信息保存事件

const {dModel,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
    if(d.uId && d.devId){
        const nData = {
            info:{
                name:d.info.name,
                msg:d.info.msg,
                hCode:d.info.hCode
            },
            limit:{
                min:d.limit.min,
                max:d.limit.max
            },
            option:{
                showAllUser:d.option.showAllUser,
                openChart:d.option.openChart
            }
        };

        putMsg('监测点修改','接收到监测点修改请求',nData);

        if(!back){
            dModel.findOneAndUpdate({uId:d.uId,devId:d.devId},nData, (err,data) => {
                if(err) putMsg('监测点修改',"监测点修改事件遇到了一个错误。",err,1);
                if(data) back = true;
                putMsg('监测点修改','已修改一个监测点!');
            });
            back = true;
        }
    }

    return back;
};