
//获取场景详细信息事件

const {eModel,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
    if(d.uId && d.envId){
        const nData = {
            envId:d.envId
        };

        putMsg('场景信息','接收到用户的查询请求',nData);

        //根据环境ID，找到匹配环境，判断是否公开或者是否为对应用户，是就返回数据
        await eModel.findOne(nData,(err,data) => {
            if(err){
                putMsg('场景信息',"查询事件遇到了一个错误。",err,1);
            }else{
                putMsg('场景信息',"已成功向数据库中查找一条场景信息!",data);
                if(data){
                    if(!data.hidden && (data.option.showAllUser || data.uId === d.uId)){
                        back = {
                            info:{
                                name:data.info.name,
                                desc:data.info.desc,
                                link:data.info.link,
                                icon:data.info.icon,
                                color:data.info.color
                            },
                            limit:{
                                min:data.limit.min,
                                max:data.limit.max
                            },
                            option:{
                                showAllUser:data.option.showAllUser,
                                line:data.option.line,
                                area:data.option.area
                            },
                            envId:data.envId,
                            uId:data.uId
                        }
                    }
                }
            }
        });
    }

    return back;
};