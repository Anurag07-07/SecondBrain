import mongoose from "mongoose";
import express from 'express'
import ContentSchema from "../models/Content.Schema.js";

export const createContent = async(req:express.Request,res:express.Response)=>{
  try {
    //Parse The Content
    const {title,type,link,tags} = req.body
    console.log(tags);
    

    //Get The UserId from the Request
    const UserId = req.userId

    //Insert into the database 
    const content = await ContentSchema.create({
      title,
      type,
      link,
      tags:tags,
      userId:UserId
    })

    res.status(200).json({
      message:`Content has Created`,
      contentid:content.id,
      data:content
    })

  } catch (error) {
    res.status(403).json({
      message:`Incorrect Input Data`
    })   
  }
}

export const getContent = async(req:express.Request,res:express.Response)=>{
  try {
    
    //Get The UserId From the Request
    const UserId = req.userId
    
    //Find The Content on the Basis of the UserId
    const content = await ContentSchema.find({
      userId:UserId
    }).populate("userId","username") //To get The Userid of the user and Username of the user 
  
    res.status(200).json({
      data:content
    })

  } catch (error) {
    res.status(500).json({
      message:`Internal Server Error`
    })
  }
}

export const deleteContent = async(req:express.Request,res:express.Response)=>{
  
  try {
    //Get the User Id from the Request
    const UserId = req.userId
    const contentId = req.params.contentId
  
    //Delete The Content
    await ContentSchema.findOneAndDelete({
      _id:contentId,
      userId:UserId
    })

    res.status(200).json({
      message:`Content Delete`
    })
  } catch (error) {
    res.status(500).json({
      message:`Internal Server Error`
    })
  }
}