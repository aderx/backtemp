
//新增场景事件

const {eModel,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
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
            showAllUser:d.option.showAllUser,
            line:d.option.line,
            area:d.option.area
        },
        child:[],
        uId:d.uId
    };

    putMsg('新增场景','接收到场景新增请求',nData);

    if(!back){
        eModel.create(nData, (err,data) => {
            if(err) putMsg('新增场景',"新增事件遇到了一个错误。",err,1);
            if(data) back = true;
            putMsg('新增场景','已新增一个场景!');
        });
        back = true;
    }

    return back;
};