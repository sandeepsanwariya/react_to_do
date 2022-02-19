const express=require('express');
const app=express()
const con =require('./db/conn');
const dotenv=require('dotenv');
const cors =require('cors');
app.use(cors({origin: 'http://localhost:3000'}));
dotenv.config()
con.on('open',()=>{
    console.log('db connected')
})

app.use(express.json())
app.get('/', (req,res)=>{
    res.send("hello word")
})


const taskRoutes=require('./routes/task')
app.use('/task',taskRoutes)

const userRoutes=require('./routes/user')
app.use('/user',userRoutes)


// app.get('/home', (req,res)=>{
//     res.send("hello home")
// })
// app.get('/data/:id', (req,res)=>{
//     res.send(`hello home ${req.params.id}`,)
// })

const port =process.env.PORT||3000
app.listen(port,()=>console.log('server on'))