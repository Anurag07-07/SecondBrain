import mongoose from "mongoose";
import express from 'express';
import ContentSchema from "../models/Content.Schema.js";
import CreateHash from "../utils/GenerateLink.js";
import LinkSchema from "../models/Link.Schema.js";
export const createContent = async (req, res) => {
    try {
        //Parse The Content
        const { title, type, link, tags, description } = req.body;
        //Get The UserId from the Request
        const UserId = req.userId;
        //Insert into the database 
        const content = await ContentSchema.create({
            title,
            type,
            description,
            link,
            tags: tags,
            userId: UserId,
        });
        res.status(200).json({
            content,
            message: `Content has Created`,
            contentid: content.id,
        });
    }
    catch (error) {
        res.status(403).json({
            message: `Incorrect Input Data`
        });
    }
};
export const getContent = async (req, res) => {
    try {
        //Get The UserId From the Request
        const UserId = req.userId;
        //Find The Content on the Basis of the UserId
        const content = await ContentSchema.find({
            userId: UserId
        }).populate("userId", "username"); //To get The Userid of the user and Username of the user 
        res.status(200).json({
            data: content
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Internal Server Error`
        });
    }
};
export const deleteContent = async (req, res) => {
    try {
        //Get the User Id from the Request
        const UserId = req.userId;
        const contentId = req.params.contentId;
        //Delete The Content
        await ContentSchema.findOneAndDelete({
            _id: contentId,
            userId: UserId
        });
        res.status(200).json({
            message: `Content Delete`
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Internal Server Error`
        });
    }
};
export const LinkGenerate = async (req, res) => {
    const { share } = req.body;
    try {
        //Get The UserId
        const UserId = req.userId;
        //Create a link and store in link model
        const hash = CreateHash(10);
        //if share is true generate link if it is false delete the link
        if (!share) {
            await LinkSchema.findOneAndDelete({ userId: UserId });
            return res.status(200).json({
                message: `Link Removed`
            });
        }
        else {
            //Store link and userId in the database
            await LinkSchema.create({
                hash,
                userId: UserId
            });
            res.status(200).json({
                message: `${hash}`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Internal Server Error`
        });
    }
};
//# sourceMappingURL=Content.controllers.js.map