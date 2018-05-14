import express = require('express')
import { Router,Request,Response } from 'express'

import {Subject,Teacher} from '../../db'
import SubjectModel from '../../models/Subject'
const route:Router = express.Router()

route.get('/',(req:Request,res:Response)=>
{
    Subject.findAll()
    .then((data:SubjectModel[])=>
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
        Subject.findById(req.params.id)
        .then((data:SubjectModel|null)=>{
            if(data){
                res.status(200).json(data)
            }
            else
            {
                res.status(404).json({
                    message:"no Subject with respect to this ID"
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

route.get('/:id/teachers',(req:Request,res:Response)=>{

    if(isNaN(req.params.id)){
        res.status(400).json({
            message:"id should be a number"
        })
    }
    else
    {
        Subject.find({
            where:{
                id:req.params.id
            },
            include:[{
                model:Teacher            
            }]
        })
        .then((result:SubjectModel|null)=>{
            res.status(200).json(result)
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
    Subject.create({
        name:req.body.name,
        courseId:req.body.courseId
    })
    .then((createdSub:SubjectModel|null)=>    {
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

// *** PUT REQUEST ***

route.put('/:id',(req:Request,res:Response)=>
{
    if(isNaN(req.params.id)){
        res.status(400).json({
            message:"id should be a number"
        })
    }
    else
    {
        Subject.find({
            where:{
                id:req.params.id
            }
        })
        .then((subject:any)=> {
            if(subject)
            {
                subject.name=req.body.name;
    
                subject.save();
    
                res.status(201).json({
                    message:"Successfully Updated!"
                })
            }
            else{
                res.status(400).json({
                    message:"no subject found!"
                })
            }
        })
        .catch((err)=>
        {
            res.status(400).json({
                error:'Error in creating :' + err
            })
        })
    }
    
})

// *** DELETE REQUEST ***

route.delete('/:id',(req:Request,res:Response)=>{

    if(isNaN(req.params.id)){
        res.status(400).json({
            message:"id should be a number"
        })
    }
    else
    {
        Subject.destroy({
            where:{
                id:req.params.id
            }
        })
        .then((deletedSubject:number)=>{
            res.status(200).json(deletedSubject)
        })
        .catch((err)=>
        {
            res.status(400).json({
                error:'Error in deleting :' + err
            })
        })
    }
})

export default route