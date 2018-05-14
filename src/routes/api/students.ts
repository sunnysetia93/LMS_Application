import express = require('express')
import { Router,Request,Response } from 'express'

import {Student,Batch,Subject,Course,StudentBatch} from '../../db'
import StudentModel from '../../models/Student'
const route:Router = express.Router()

route.get('/',(req:Request,res:Response)=>
{
    Student.findAll()
    .then((data:StudentModel[])=>
    {
        res.status(200).json(data);
    })
    .catch(err=>
    {
        res.status(404).json({
            messsage:"Error in fetching data! " + err
        })
    })
})

route.get('/:id',(req:Request,res:Response)=>{
    
    if(isNaN(req.params.id)){
        res.status(400).json({
            message:"id should be a number"
        })
    }
    else
    {    
        Student.findById(req.params.id)
        .then((data:StudentModel|null)=>{
            if(data){
                res.status(200).json(data)
            }
            else
            {
                res.status(404).json({
                    message:"no Student with respect to this ID"
                })
            }

        })
        .catch(err=>{
            
            res.status(400).json({
                error:'Error in finding :' + err
            })
        })
    }
})

route.get('/:id/batches',(req:Request,res:Response)=>{
    if(isNaN(req.params.id)){
        res.status(400).json({
            message:"id should be a number"
        })
    }
    else
    {
        Student.find({
            where:{
                id:req.params.id
            },
            include:[
                {
                    model:Batch
                }
            ]
        })
        .then((student:StudentModel|null)=>
        {
            
            if(!student)
            {
                res.status(400).json({
                    message:"No Student found with this ID"
                })
            }
            else
            {
                res.status(200).json(student)
            }
        })
        .catch(err=>{
            
            res.status(400).json({
                error:'Error in finding :' + err
            })
        })
    }
})


// *** POST REQUEST ***

route.post('/',(req:Request,res:Response)=>
{

    Student.create({
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
    })
    .then((createdStudent:StudentModel|null)=>    {
        res.status(201).json({
            message:"Successfully Created!"
        })
    })
    .catch((err)=>
    {
        res.status(400).json({
            error:'Error in creating :' + err
        })
    })
            
})

route.post('/enroll',(req:Request,res:Response)=>{

    StudentBatch.create({
        studentId:req.body.studentId,
        batchId:req.body.batchId
    })
    .then((result:StudentModel|null)=>
    {
        res.status(200).json(result)  
    })
    .catch((err)=>
    {
        res.status(400).json({
            error:'Error in creating :' + err
        })
    })
})

// *** PUT REQUEST ***


route.put('/:id',(req:Request,res:Response)=>
{

    Student.findById(req.params.id)
    .then((stud:any)=>    {

        if(stud)
        {
            stud.name=req.body.name;
            stud.age=req.body.age;
            stud.email=req.body.email;
            stud.save();

            res.status(201).json({
                message:"Successfully Updated!"
            })
        }
        else{
            res.status(400).json({
                message:"No Student found with this ID"
            })
        }
        
    })
    .catch((err)=>
    {
        res.status(400).json({
            error:'Error in creating :' + err
        })
    })
            
})

// *** DELETE REQUEST ***


route.delete('/:id',(req:Request,res:Response)=>
{

    Student.destroy({
        where:{
            id:req.params.id
        }
    })
    .then((deleted:number)=>    {

        res.status(200).json({
            deletedStatus:deleted
        })
        
    })
    .catch((err)=>
    {
        res.status(400).json({
            error:'Error in creating :' + err
        })
    })
            
})

export default route