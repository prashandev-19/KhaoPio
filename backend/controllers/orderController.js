import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import Stripe from "stripe"
import 'dotenv/config';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//placing user order for frontend
const placeOrder = asyncHandler(async(req , res) =>{

    const frontend_url = "http://localhost:5173";

    const newOrder = new orderModel({
        userId: req.userId,
        items : req.body.items,
        amount : req.body.amount,
        address: req.body.address
    })

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId,{cart:{}});

    const line_items = req.body.items.map((item)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:item.name
            },
            unit_amount: item.price * 100
        },
        quantity:item.quantity
    }))

    line_items.push({
        price_data:{
            currency:"usd",
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount: 2 * 100
        },
        quantity:1
    })

    const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`      
    })
    
    console.log(session.url);
    return res
    .status(200)
    .json(new ApiResponse(200,{session_url:session.url},"Stripe session created"));
})

const verifyOrder = asyncHandler(async (req,res) =>{
    const {orderId , success} = req.body;

    if(success == "true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.status(200)
        .json(new ApiResponse(200,{},"Payment successful"));
    }
    else{
        await orderModel.findByIdAndDelete(orderId);
        res.status(400)
        .json(new ApiResponse(400,{},"Payment failed"));
    }
}) 

//user orders for frontend

const userOrders = asyncHandler(async(req,res)=>{
    const orders = await orderModel.find({userId:req.userId});
    res.status(200)
    .json(new ApiResponse(200,orders,"User order"));
})

//Listing orders for admin panel
const listOrders = asyncHandler(async(req,res)=>{
    const orders = await orderModel.find({});
    res.status(200)
    .json(new ApiResponse(200,orders,"Orders fetched successfully"));
})

//api for updating order status
const updateStatus = asyncHandler(async (req,res) =>{
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.status(200)
    .json(new ApiResponse(200,{},"Status Updated"));
})

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}