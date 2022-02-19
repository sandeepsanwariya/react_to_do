const mongoose = require('mongoose')

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required: true,
       
    },
    content:{
        type:String,
        required: true,
    },
    activeStatus:{
        type:Boolean,
        default:true,
    },
    trash:{
        type:Boolean,
        default:false,
    },
    owner:{
        type:String,
        required: true,
    }

})
module.exports =mongoose.model('Task',taskSchema)