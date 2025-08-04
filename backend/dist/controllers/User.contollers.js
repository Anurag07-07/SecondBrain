import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import mongoose from "mongoose";
import express from "express";
import { z } from "zod";
const email = __require("zod");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserSchema from "../models/User.Schema.js";
export const Signup = async (req, res) => {
    // Validation Check
    const requiredBody = z.object({
        username: z.string().min(5).max(30),
        email: z.string().min(5).max(30),
        password: z.string().min(5).max(30),
    });
    const safeParseData = requiredBody.safeParse(req.body);
    if (!safeParseData.success) {
        return res.status(403).json({
            message: safeParseData.error,
        });
    }
    try {
        //Parse The Data from the body
        const { username, email, password } = req.body;
        console.log(`1`);
        //Check if this user is present in database
        const Check = await UserSchema.findOne({
            username,
        });
        console.log(`2`);
        if (Check) {
            return res.status(411).json({
                message: `User already existed`,
            });
        }
        //If Not Present Create a hash of user password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        //Create The User
        await UserSchema.create({
            username,
            email,
            password: hashPassword,
        });
        res.status(200).json({
            message: `User Created Succesfully`,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Internal Server Error`,
        });
    }
};
export const Signin = async (req, res) => {
    //Validation check
    const requiredBody = z.object({
        username: z.string().min(5).max(30),
        password: z.string().min(5).max(30),
    });
    const checkSafeparse = requiredBody.safeParse(req.body);
    if (!checkSafeparse.success) {
        return res.status(411).json({
            message: checkSafeparse.error,
        });
    }
    try {
        //Parse The Data
        const { username, password } = req.body;
        //Check if that user exist or not
        console.log(`1`);
        const check = await UserSchema.findOne({
            username,
        }).select("+password");
        console.log(`2`);
        if (!check) {
            return res.status(403).json({
                message: `Invalid Credentials`,
            });
        }
        //compare the password
        const isMatch = await bcrypt.compare(password, check.password);
        if (isMatch) {
            //Create a token
            const token = jwt.sign({
                id: check._id.toString(),
            }, process.env.JWT_SECRET);
            if (!token) {
                res.status(400).json({
                    message: `Token Not Created`,
                });
            }
            else {
                res.status(200).json({
                    token: token,
                });
            }
        }
        else {
            res.status(403).json({
                message: `Invalid Credentails`,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Internal Server Error`,
        });
    }
};
//# sourceMappingURL=User.contollers.js.map