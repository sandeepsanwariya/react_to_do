const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:[true,'email alredy exist'],
        
    },
    password:{
        type:String,
        default:true,
    }

})
module.exports =mongoose.model('User',userSchema)