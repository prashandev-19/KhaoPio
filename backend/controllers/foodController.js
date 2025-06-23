import foodModel from "../models/foodModel.js";
import fs from 'fs'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

//add food item
const addFood = asyncHandler(async(req , res)=>{
    const { name, description, price, category } = req.body;

     if (!req.file) {
        throw new ApiError(400, "Image file is required");
    }

    if (!name || !description || !price || !category) {
        throw new ApiError(400, "All fields are required");
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename
    });
    try {
        await food.save();
        return res.
        status(200).
        json(new ApiResponse(200 , food , "Food added successfully"))
    } catch (error) {
       fs.unlinkSync(`uploads/${image_filename}`);
        throw new ApiError(400 , "Something went wrong while uploading!");
    }   
    
});

//food list
const foodList = asyncHandler(async(req,res)=>{
    try {
        const foods = await foodModel.find({});
        if(!foods || foods.length === 0){
            return res.status(200)
            .json(new ApiResponse(200 , foods , "Food list is empty"));
        }

        return res.status(200)
        .json(new ApiResponse(200,foods,"Food list fetched successfully"));
    } catch (error) {
        console.error("Error fetching food list:", error);
        throw new ApiError(404,"Something went wrong!");
    }
})

//remove food item
const removeFood = asyncHandler(async(req,res)=>{
    const food = await foodModel.findById(req.body.id);

    if(!food){
        throw new ApiError(404 , "Food not found!");
    }

    try {
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);

        return res.status(200)
        .json(new ApiResponse(200,{},"Food removed successfully"))
    } catch (error) {
        console.log(error);
        throw new ApiError(500 , "Something went wrong while removing food!");
    }
})

export {
    addFood,
    foodList,
    removeFood
}