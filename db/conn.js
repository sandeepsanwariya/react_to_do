const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config()
mongoose.connect(process.env.DATABASE_URI,{
   
useNewUrlParser: true, 

useUnifiedTopology: true 
}).then(()=>{console.log('conneted db')})
.catch((err)=>{console.log(err)})
const con=mongoose.connection

module.exports = con
