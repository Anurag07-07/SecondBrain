import mongoose from "mongoose";
import express from 'express'
import ContentSchema from "../models/Content.Schema.js";
import CreateHash from "../utils/GenerateLink.js";
import LinkSchema from "../models/Link.Schema.js";

export const createContent = async(req:express.Request,res:express.Response)=>{
  try {
    //Parse The Content
    const {title,type,link,tags,description} = req.body
    
    
    
    //Get The UserId from the Request
    const UserId = req.userId

    //Insert into the database 
    const content = await ContentSchema.create({
      title,
      type,
      description,
      link,
      tags:tags,
      userId:UserId,
    })

    res.status(200).json({
      content,
      message:`Content has Created`,
      contentid:content.id,
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

export const LinkGenerate = async (req: express.Request, res: express.Response) => {
    try {
        const { share } = req.body;
        const userId = req.userId;

        const existingLink = await LinkSchema.findOne({ userId });

        if (!share) {
            if (existingLink) await LinkSchema.findOneAndDelete({ userId });
            return res.status(200).json({ message: "Link removed" });
        }

        if (existingLink) {
            return res.status(200).json({ message: existingLink.hash });
        }

        const hash = CreateHash(10);
        await LinkSchema.create({ hash, userId });

        res.status(200).json({ message: hash });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const shareableLink = async (req: express.Request, res: express.Response) => {
    try {
        const shareableHash = req.params.shareableLink;

        const findUser = await LinkSchema.findOne({ hash: shareableHash });
        if (!findUser) return res.status(404).json({ message: "Invalid shareable link" });

        const content = await ContentSchema.find({ userId: findUser.userId }).select('-userId');

        res.status(200).json({ data: content });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};