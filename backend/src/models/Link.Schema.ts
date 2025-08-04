import mongoose, { Schema, Types } from "mongoose";

interface ILink extends Document{
  hash:string,
  userId:Types.ObjectId
}

const LinkSchema: Schema = new Schema({
  hash:{
    type:String,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
})

export default mongoose.model<ILink>('Link',LinkSchema)