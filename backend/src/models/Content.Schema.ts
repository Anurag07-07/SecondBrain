import mongoose, { Schema, Types } from "mongoose";

const contentTypes = ['audio','video','article','image','pdf']

interface IContent extends Document{
  link:string,
  title:string,
  userId:Types.ObjectId,
  tags:[Types.ObjectId],
  type:string
}

const ContentSchema:Schema = new Schema({
  title:{
    type:String,
    required:true
  },
  link:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true,
    enum:contentTypes
  },
  tags:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Tag"
  }],
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
})

export default mongoose.model<IContent>('Content',ContentSchema)