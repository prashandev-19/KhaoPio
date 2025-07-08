import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import validator from "validator"
import { response } from "express";

// login user
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            throw new ApiError(404,"user not found");
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            throw new ApiError(401,"enter correct password");
        }

        const token = createToken(user._id);
        return res
        .status(200)
        .json(new ApiResponse(200,token,"user logged in"));
    } catch (error) {
        console.error(error);
        const statusCode = error.statusCode || 500;
        const message = error.message || "Server Error";
        res
        .status(statusCode)
        .json({ success: false, message });
    }
})

const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY);
}

//Register User
const registerUser = asyncHandler(async(req,res)=>{
    const {name,password,email} = req.body;
    try {
        const exist = await userModel.findOne({email});
        if(exist){
           throw new ApiError(403,"User already exists")
        }

        //validating email format and strong password.
        if(!validator.isEmail(email)){
            throw new ApiError(500,"please enter valid email");
        }

        if(password.length < 8){
            throw new ApiError(411,"please enter strong password");
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res
        .status(200)
        .json(new ApiResponse(200,token,"User created Successfully!"));

    } catch (error) {
        console.error(error);
        const statusCode = error.statusCode || 500;
        const message = error.message || "Server Error";
        res
        .status(statusCode)
        .json({ success: false, message });
    }
})

export {loginUser,registerUser}
