
//新增监测点事件

const {dModel,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;

    if(!d.uId || !d.envId) return false;

    const nData = {
        info:{
            name:d.info.name,
            msg:d.info.msg,
            hCode:d.info.hCode,
        },
        limit:{
            min:d.limit.min,
            max:d.limit.max
        },
        option:{
            showAllUser:d.option.showAllUser,
            run:d.option.run,
            openChart:d.option.openChart
        },
        uId:d.uId,
        envId:d.envId
    };

    //若监测点已运行则直接开启计算运行时间
    if(d.option.run){
        nData['show.beginTime'] = new Date();
    }

    putMsg('新增监测点','接收到监测点新增请求',nData);

    dModel.create(nData, (err,data) => {
        if(err) putMsg('新增监测点',"新增事件遇到了一个错误。",err,1);
        if(data) back = true;
        putMsg('新增监测点','已新增一个监测点!');
    });
    back = true;

    return back;
};