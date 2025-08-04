import mongoose,{Schema}  from 'mongoose'
//Create a Interface

interface IUser extends Document{
  username:string,
  email:string,
  password:string,
  createdAt?:Date
}

const UserSchema: Schema = new Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    select:false
  },
  createdAt:{
    type:Date
  }
})

export default mongoose.model<IUser>('User',UserSchema)