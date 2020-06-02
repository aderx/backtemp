
//场景删除事件

const {eModel,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
    if(d.envId && d.uId){
        const nData = {
            uId:d.uId,
            envId:d.envId
        };

        putMsg('场景删除','接收到场景删除请求',nData);

        await eModel.findOneAndUpdate(nData,{hidden:true},(err,data) => {
            if(err) putMsg('场景删除',"场景删除事件遇到了一个错误。",err,1);
            if(data) back = true;
            putMsg('场景删除','已删除一个场景!');
        });
    }

    return back;
};