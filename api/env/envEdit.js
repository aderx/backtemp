
//修改场景信息保存事件

const {eModel,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
    if(d.uId && d.envId){
        const nData = {
            info:{
                name:d.info.name,
                desc:d.info.desc,
                link:d.info.link,
                icon:d.info.icon,
                color:d.info.color
            },
            limit:{
                min:d.limit.min,
                max:d.limit.max
            },
            option:{
                area:d.option.area
            }
        };

        putMsg('场景修改','接收到场景修改请求',nData);

        if(!back){
            eModel.findOneAndUpdate({uId:d.uId,envId:d.envId},nData, (err,data) => {
                if(err) putMsg('场景修改',"场景修改事件遇到了一个错误。",err,1);
                if(data) back = true;
                putMsg('场景修改','已修改一个场景!');
            });
            back = true;
        }
    }

    return back;
};