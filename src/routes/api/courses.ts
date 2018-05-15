import express = require('express')
import { Router,Request,Response } from 'express'

import {Course,Batch,Lecture, Student, Subject,Teacher} from '../../db'
import CourseModel from '../../models/Course'
import BatchModel from '../../models/Batch'


const route:Router = express.Router()

route.get('/',(req:Request,res:Response)=>{
    
    Course.findAll()
    .then((data:CourseModel[])=>{
        
        res.status(200).json(data)
    })
    .catch(err=>{
        
        res.status(400).json({
            error:'Error in finding :' + err
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
        Course.findById(req.params.id)
        .then((data:CourseModel|null)=>{
            if(data){
                res.status(200).json(data)
            }
            else
            {
                res.status(404).json({
                    message:"no course with respect to this ID"
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
        Batch.findAll({
            where:{
                courseId:req.params.id
            }
        })
        .then((result:BatchModel[])=>{
            if(result){
                res.status(200).json(result)
            }
            else
            {
                res.status(404).json({
                    message:"no batches with respect to this ID"
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

route.get('/:id/batches/:batchId',(req:Request,res:Response)=>{
    
    if(isNaN(req.params.id) || isNaN(req.params.batchId)){
        res.status(400).json({
            message:"id should be a number"
        })
    }
    else
    {

    
        Batch.find({
            where:{
                courseId:req.params.id,
                id:req.params.batchId
            }
        })
        .then((result:BatchModel|null)=>{
            if(result){
                res.status(200).json(result)
            }
            else
            {
                res.status(404).json({
                    message:"no batches with respect to this ID"
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

route.get('/:id/batches/:batchId/lectures',(req:Request,res:Response)=>{

    if(isNaN(req.params.id) || isNaN(req.params.batchId)){
        res.status(400).json({
            message:"id should be a number"
        })
    }
    else{

        Batch.find({
            where:{
                id:req.params.batchId,
                courseId:req.params.id
            }
        })
        .then((data:BatchModel|null)=>{
            if(data)
            {   
                Lecture.findAll({
                    where:{
                        batchId:req.params.batchId
                    }
                })
                .then((result)=>{
                    res.status(200).json(result)
                })
            }
            else{
                res.status(404).json({
                    message:"no batches with respect to this ID"
                })
            }
        })
        .catch(err=>
        {
            res.status(400).json({
                error:'Error in finding :' + err
            })
        })
    }
})

route.get('/:id/batches/:batchId/lectures/:lectId',(req:Request,res:Response)=>{

    if(isNaN(req.params.id) || isNaN(req.params.batchId)|| isNaN(req.params.lectId)){
        res.status(400).json({
            message:"id should be a number"
        })
    }
    else{

        Batch.find({
            where:{
                id:req.params.batchId,
                courseId:req.params.id
            }
        })
        .then((data:BatchModel|null)=>{
            if(data)
            {   
                Lecture.find({
                    where:{
                        batchId:req.params.batchId,
                        id:req.params.lectId
                    }
                })
                .then((result)=>{
                    res.status(200).json(result)
                })
            }
            else{
                res.status(404).json({
                    message:"no batches with respect to this ID"
                })
            }
        })
        .catch(err=>
        {
            res.status(400).json({
                error:'Error in finding :' + err
            })
        })
    }
})

route.get('/:id/batches/:batchId/students',(req:Request,res:Response)=>{

    Batch.find({
        where:{
            id:req.params.batchId,
            courseId:req.params.id
        },
        include:[{
            model:Student
        }]
    })
    .then((result:BatchModel|null)=>{
        if(result)
        {
            res.status(200).json(result);
        }
        else
        {
            res.status(200).json({
                message:"No result found!"
            })
        }
    })
    .catch((err)=>{
        res.status(400).json(err);
    })
})

route.get('/:id/batches/:batchId/teachers',(req:Request,res:Response)=>{

    Batch.find({
        where:{
            id:req.params.batchId,
            courseId:req.params.id
        },
        include:
        [
            {
                model:Course,
                attributes:['id','name'],
                include:[
                    {
                        model:Subject,
                        attributes:['id','name'],                        
                        include:[
                            {
                                model:Teacher,
                                attributes:['id','name','email']
                                
                            }
                        ]
                    }
                ]
            }
        ]
    })
    .then((result:BatchModel|null)=>{
        if(result)
        {
            res.status(200).json(result);
        }
        else
        {
            res.status(200).json({
                message:"No result found!"
            })
        }
    })
    .catch((err)=>{
        res.status(400).json(err);
    })
})

// *** POST REQUEST ***

route.post('/',(req:Request,res:Response)=>
{
    Course.create({
        name:req.body.name
    })
    .then((createdCourse:CourseModel|null)=>    {
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

route.post('/:id/batches',(req:Request,res:Response)=>{
    
    if(isNaN(req.params.id)){
        res.status(400).json({
            message:"id should be a number"
        })
    }
    else
    {

        Course.findById(req.params.id)
        .then((data:CourseModel|null)=>
        {
            if(data){
                Batch.create({
                    name:req.body.name,
                    startYear:req.body.startYear,
                    courseId:req.params.id
                })
                .then((createdBatch)=>{
            
                    res.status(201).json({
                        message:"Successfully Created!"
                    })
                })
            }
            else{

                res.status(404).json({
                    message:"No course ID found"
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

route.post('/:id/batches/:batchId/lectures',(req:Request,res:Response)=>{

    if(isNaN(req.params.id) || isNaN(req.params.batchId)){
        res.status(400).json({
            message:"id should be a number"
        })
    }
    else{
        Batch.find({
            where:{
                id:req.params.batchId,
                courseId:req.params.id
            }
        })
        .then((data:BatchModel|null)=>{
            if(data)
            {   
                Lecture.create({
                    
                    batchId:req.params.batchId,
                    teacherId:req.body.teacherId,
                    subjectId:req.body.subjectId
                })
                .then((result)=>{
                    res.status(200).json({
                        message:"Successfully Created!"                        
                    })
                })
            }
            else{
                res.status(404).json({
                    message:"no batches with respect to this ID"
                })
            }
        })
        .catch(err=>
        {
            res.status(400).json({
                error:'Error in finding :' + err
            })
        })
    }
})

// *** PUT REQUEST ***

route.put('/:id',(req:Request,res:Response)=>{
    
    if(isNaN(req.params.id)){
        res.status(400).json({
            message:"id should be a number"
        })
    }
    else
    {    
        Course.findById(req.params.id)
        .then((course:any)=>{
            if(course){
                
                course.name=req.body.name;
                course.save();
                res.status(200).json({
                    message:"updated!"
                })
            }
            else
            {
                res.status(404).json({
                    message:"no course with respect to this ID"
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

route.put('/:id/batches/:batchId',(req:Request,res:Response)=>{
    
    if(isNaN(req.params.id)){
        res.status(400).json({
            message:"id should be a number"
        })
    }
    else
    {

        Batch.find({
            where:{
                id:req.params.batchId,
                courseId:req.params.id
            }
        })
        .then((batch:any)=>
        {
            if(batch){
                
                batch.name=req.body.name;
                batch.startYear= req.body.startYear
                batch.save();
                res.status(200).json({
                    message:"updated!"
                })
            }
            else{

                res.status(404).json({
                    message:"No course ID found"
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


export default route