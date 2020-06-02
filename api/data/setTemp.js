
//新增监测点温度事件

const {dModel,putMsg} = require('../../mongodb/index');

module.exports = async function (d){
    let back = false;
    if(d.code){

        putMsg('新增温度','接收到新增监测点温度请求');

        if(!back){
             dModel.findOneAndUpdate(
                 {'info.hCode':d.code,'option.run':true},
                {
                    $set:{
                        'show.temp':d.temp
                    },
                    $addToSet:{
                        devHistory:{
                            temp:d.temp
                        }
                    }
                },
                {
                    new:true,
                    useFindAndModify:false
                },
                (err,data) => {
                if(err) putMsg('新增温度',"新增监测点温度事件遇到了一个错误。",err,1);
                if(data){
                    back = true;
                    putMsg('新增温度','已新增一个监测点温度!');
                    if(data.show.highestTemp < d.temp){
                        dModel.updateOne({'info.hCode':d.code},{'show.highestTemp':d.temp},(err,result)=>{
                            if(err) throw err;
                        });
                    }else if(data.lowestTemp > d.temp){
                        dModel.updateOne({'info.hCode':d.code},{'show.lowestTemp':d.temp},(err,result)=>{
                            if(err) throw err;
                        });
                    }
                }
            });
            back = true;
        }
    }

    return back;
};