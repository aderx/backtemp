
//监测点删除事件

const {dModel,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
    if(d.envId && d.uId){
        const nData = {
            uId:d.uId,
            devId:d.devId
        };

        putMsg('监测点删除','接收到监测点删除请求',nData);

        await dModel.findOneAndUpdate(nData,{hidden:true},(err,data) => {
            if(err) putMsg('监测点删除',"监测点删除事件遇到了一个错误。",err,1);
            if(data) back = true;
            putMsg('监测点删除','已删除一个场景!');
        });

    }

    return back;
};