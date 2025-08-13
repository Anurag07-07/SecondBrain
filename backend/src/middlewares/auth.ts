import jwt from 'jsonwebtoken'
import express, { type NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()

interface JwtPayload{
  id:string
}

const authMiddleware = async(req:express.Request,res:express.Response,next:NextFunction)=>{
  try {
      //Fetch the Token From The Headers
      const tokenString = req.headers.authorization


      console.log("Working")
      //Get The Token from The Token String
      const token = tokenString?.split(" ")[1]

      //Check if the token is there or not
      if (!token) {
        return res.status(403).json({
          message:`Token Expired`
        })
      }

      //Verify The Token
      const verify = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
      
      if (!verify) {
        return res.status(403).json({
          message:`Invalid Token`
        })
      }else{
        req.userId = verify.id 
        next()
      }
  } catch (error) {
    res.status(500).json({
      message:`Internal Server Error`
    })    
  }
}
export default authMiddleware