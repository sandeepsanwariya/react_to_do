const express=require("express");
const { updateOne } = require("../models/task");
const router=express.Router()
const Task=require("../models/task");
const auth= require("./authValidation")
const { taskcreateValidation,taskupdateValidation} = require("./validator");
router.get('/all',auth,async(req,res)=>{
    const task=await Task.find({user:req.user})
    if(!task) return res.status(400).send(res.send('Task not Found')) 
    else{
        res.status(200).json(task)
    }
})

router.get('/details/:id',auth ,async(req,res)=>{

    const task=await Task.findOne({_id:req.params.id})
    if(!task) return res.status(400).send(res.send('Task not Found')) 
    else{
        res.status(200).json(task)
    }
 })
 router.delete('/delete/:id',auth ,async(req,res)=>{
    const task=await Task.findOne({_id:req.params.id})
        if(!task) return res.status(400).send(res.send('Task not Found')) 
      
        try{
            const _id=req.params.id
            const reslt= await Task.findByIdAndDelete(_id)
            res.status(200).json(reslt)
        }catch(err){
            res.status(500).json(err)
        }
 })
 router.post('/create',auth ,async(req,res)=>{
    console.log(req.body)
    const { error } = await  taskcreateValidation(req.body)
    if (error) { return res.status(400).send(error.details[0].message) }

    try{
        const taskcheck=await Task.findOne({title:req.body.title})
        if(taskcheck) return res.status(400).json('Title already exist')

        const newTask = Task({ title:req.body.title,content:req.body.content,activeStatus:true,tash:false,owner:req.user})
        newTask.save()
            .then(task => { res.status(200).json(task) })
            .catch(err => { res.status(500).json(err) })
    }catch(err){
       res.status(500).json(err.details[0].message)
    }
 })
 router.patch('/update/:id',auth ,async(req,res)=>{

    try{
        console.log(req.body)
        const { error } = await taskupdateValidation(req.body)
        if (error) return res.status(400).json(error.details[0].message) 
        const task=await Task.findOne({_id:req.params.id})
        if(!task) return res.status(400).send('Task not Found') 
        console.log('2')
        const _id={_id:req.params.id}
        const updatetask= await Task.findByIdAndUpdate(_id,req.body)
        console.log('6',updatetask)
        res.status(200).json(updatetask)
    }catch(err){
        res.status(406).json(err.details[0].message)
    }
 })
module.exports=router