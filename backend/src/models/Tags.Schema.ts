import mongoose, { Schema } from "mongoose";

interface ITag extends Document{
  tags:string
} 

const TagSchema: Schema = new Schema({
  tag:{
    type:String
  }
})

export default mongoose.model<ITag>('Tag',TagSchema)