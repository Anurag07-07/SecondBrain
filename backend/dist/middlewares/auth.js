import jwt from 'jsonwebtoken';
import express, {} from 'express';
import dotenv from 'dotenv';
dotenv.config();
const authMiddleware = async (req, res, next) => {
    try {
        //Fetch the Token From The Headers
        const tokenString = req.headers.authorization;
        //Get The Token from The Token String
        const token = tokenString?.split(" ")[1];
        //Check if the token is there or not
        if (!token) {
            return res.status(403).json({
                message: `Token Expired`
            });
        }
        //Verify The Token
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (!verify) {
            return res.status(403).json({
                message: `Invalid Token`
            });
        }
        else {
            req.userId = verify.id;
            next();
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Internal Server Error`
        });
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.js.map