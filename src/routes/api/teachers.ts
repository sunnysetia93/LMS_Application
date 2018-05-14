import express = require('express')
import { Router,Request,Response } from 'express'

import {Teacher,Batch,Subject,Course} from '../../db'
import TeacherModel from '../../models/Teacher'
const route:Router = express.Router()

route.get('/',(req:Request,res:Response)=>
{
    Teacher.findAll()
    .then((data:TeacherModel[])=>
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
        Teacher.findById(req.params.id)
        .then((data:TeacherModel|null)=>{
            if(data){
                res.status(200).json(data)
            }
            else
            {
                res.status(404).json({
                    message:"no Teacher with respect to this ID"
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
        Teacher.find({
            where:{
                id:req.params.id
            },
            include:[
                {
                    model:Subject,
                    attributes:['id'],
                    include:[{
                        model:Course,
                        attributes:['id'],
                        include:[{
                            model:Batch
                        }]
                    }]
                }
            ]
        })
        .then((teacher:TeacherModel|null)=>
        {
            
            if(!teacher)
            {
                res.status(400).json({
                    message:"No teacher found with this ID"
                })
            }
            else
            {
                res.status(200).json(teacher)
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
    Teacher.find({
        where:{
            email:req.body.email
        }
    })
    .then((result:TeacherModel|null)=>
    {
        if(result)
        {
            res.status(400).json({
                message:"This Teacher already teaches a subject."
            })
        }
        else
        {
            Teacher.create({
                name:req.body.name,
                email:req.body.email,
                subjectId:req.body.subjectId
            })
            .then((createdTeacher)=>    {
                res.status(201).json({
                    message:"Successfully Created!"
                })
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


// *** PUT REQUEST ***


route.put('/:id',(req:Request,res:Response)=>
{

    Teacher.findById(req.params.id)
    .then((teacher:any)=>    {

        if(teacher)
        {
            teacher.name=req.body.name;
            teacher.email=req.body.email;
            teacher.save();

            res.status(201).json({
                message:"Successfully Updated!"
            })
        }
        else{
            res.status(400).json({
                message:"No Teacher found with this ID"
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

    Teacher.destroy({
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