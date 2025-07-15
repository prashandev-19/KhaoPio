import userModel from "../models/userModel.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asynchandler.js"


//add items to user cart
const addToCart = asyncHandler(async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cart;
        if(!cartData[req.body.itemId]){

            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId]+= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cart:cartData});
        res.
        status(200)
        .json(new ApiResponse(200,{},"Added to cart"));
    } catch (error) {
        console.log(error);
        throw new ApiError(400,"Something went wrong!");
    }
})

//remove items from user cart
const removeFromCart = asyncHandler(async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);  //we recieve the user id from the middleware
                                                             //which decodes the token and gives us the id.
        let cartData = await userData.cart;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] = cartData[req.body.itemId] - 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cart:cartData});
        return res
        .status(200)
        .json(new ApiResponse(200,{},"Removed from cart!"));
    } catch (error) {
        console.log(error);
        throw new ApiError(400,error.message);
    }
})

//fetch user cart data
const getCart = asyncHandler(async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            throw new ApiError(404, "User not found");
        }

        let cartData = userData.cart || {};

        return res
        .status(200)
        .json(new ApiResponse(200,cartData,"Cart Data fetched!"))
    } catch (error) {
        console.log(error);
        throw new ApiError(400,error.message || "Failed to fetch cart data");
    }
})

export{
    addToCart,
    removeFromCart,
    getCart
}