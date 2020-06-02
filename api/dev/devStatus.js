
//修改监测点状态信息保存事件

const {dModel,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
    if(d.uId && d.devId){
        const nData = {};
        if(d.run !== undefined){
            nData['option.run'] = d.run;
            if(d.run){
                nData['show.beginTime'] = new Date();
            }else{
                nData['show.beginTime'] = '';
            }
        }

        putMsg('监测点状态修改','接收到监测点状态修改请求',nData);

        if(!back){
            dModel.findOneAndUpdate({uId:d.uId,devId:d.devId},nData, (err,data) => {
                if(err) putMsg('监测点状态修改',"监测点状态修改事件遇到了一个错误。",err,1);
                if(data) back = true;
                putMsg('监测点状态修改','已修改一个监测点状态!');
            });
            back = true;
        }
    }

    return back;
};