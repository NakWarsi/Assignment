const mongoose=require('mongoose')
const config=require('../config/database')

//user schema
const UserSchema=mongoose.Schema({
    sensor:{
        type:String,
       //unique:true
      // required:true
    },
    temperature:{
        type:Number,
       //required:true
    },
    humidity:{
        type:Number,
        //required:true
    },
    time:{
        type:Number,
       // required:true
    }
})

const Device=module.exports=mongoose.model('device',UserSchema)


module.exports.addDevice=function(device,callback){
    Device.create(device,callback);
}

module.exports.getData=function(callback){
    Device.find(callback);
}