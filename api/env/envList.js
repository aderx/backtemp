
//获取场景列表事件

const {eModel,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = [];
    if(!d.uId) return false;

    putMsg('场景列表','接收到用户的查询请求');

    //查找所有用户，然后再循环判断
    await eModel.find({},(err,data) => {
        if(err){
            putMsg('场景列表',"查询事件遇到了一个错误。",err,1);
        }else{
            putMsg('场景列表',"已成功向数据库中查找用户ID相同的场景信息!");
            let nData = data.filter(item=>{
                return (!item.hidden && (item.uId === d.uId || item.option.showAllUser));
            });
            nData.forEach(d=>{
                back.push({
                    envId:d.envId,
                    info:{
                        name:d.info.name,
                        desc:d.info.desc,
                        icon:d.info.icon,
                        color:d.info.color
                    },
                    option:{
                        showAllUser:d.option.showAllUser
                    }
                })
            })
        }
    });

    return back;
};