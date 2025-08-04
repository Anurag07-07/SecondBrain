import mongoose from 'mongoose'

const dbConnect = async():Promise<void> =>{
  try {
    await mongoose.connect(process.env.MONGO_DB as string)
    console.log(`Database Connected`);
  } catch (error) {
    console.log(`Database Not connected`);
    console.error(error);
    process.exit(1)
  }
}
export default dbConnect;