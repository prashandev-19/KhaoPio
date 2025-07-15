import jwt from "jsonwebtoken"
import { asyncHandler } from '../utils/asynchandler.js'
import { ApiError } from '../utils/ApiError.js';

const authMiddleWare = asyncHandler(async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        throw new ApiError(401,"Not authorized,login again");
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = { id: decodedToken.id };
        next();
    } catch (error) {
        console.log(error);
        throw new ApiError(400,"Something went wrong!");
    }
})

export default authMiddleWare;