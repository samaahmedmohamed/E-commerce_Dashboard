
const mongoose = require('mongoose');

const orderModel = require("../Models/orderModel");
const productModel=require('../Models/productModel')
const catchAsync = require("../utilities/catchAsync");

const getAllOrders = catchAsync(async (req, res) => {
  const data = await orderModel.find({})
    .populate("user")
    .populate("items.product"); 

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});


const createOrder = catchAsync(async (req, res) => {
  const itemsWithPrices = await Promise.all(
    req.body.items.map(async (item) => {
      console.log(item.product);
      const productId = new mongoose.Types.ObjectId(item.product);
      const product = await productModel.findById(productId);
      console.log("Product found:", product);
      // const itemTotal = product.price * item.quantity;
      item.totalPriceItems = item.quantity * item.product.price;

         console.log(itemTotal);
      return {
        ...item,
        totalPriceItems: item.totalPriceItems,
      };
    })
  );
  const orderTotalPrice = itemsWithPrices.reduce((sum, item) => sum + item.totalPriceItems, 0);
  console.log(orderTotalPrice);

  const order = await orderModel.create({
    ...req.body,
    items: itemsWithPrices,
    totalPriceOrder: orderTotalPrice,
  });

  res.status(200).json({
    status: "success",
    results: order,
  });
});

const getOrderBYId=catchAsync(async(req,res)=>{
 const order= await orderModel.findById(req.params.id).populate('user') .populate({
    path: 'items.product',
    select: 'name price brand images'
  });
 if(!order){
   return res.status(404).json({ message: 'Order not found' });
 }

  res.status(200).json({
    status: "success",
    result: order,
  });
})

const updateOrder = catchAsync(async (req, res) => {
  const { status } = req.body; 

  if (!status) {
    return res.status(404).json({ message: 'Status is required' });
  }

  const order = await orderModel.findByIdAndUpdate(
    req.params.id,
    { status }, // 👈 تحديث status فقط
    { new: true, runValidators: true }
  );

  if (!order) {
    return res.status(400).json({ message: 'Nothing to update' });
  }

  res.status(200).json({
    status: "success",
    message: "Updated successfully",
    results: order,
  });
});

const deleteOrder=catchAsync(async(req,res)=>{
     const Cancelled= await  orderModel.findByIdAndUpdate(req.params.id,{status:'Cancelled'}) ;
     if(!Cancelled){
      return res.status(400).json({message: 'Nothing to update'});
     }
     res.status(200).json({
    status: "success",
    message: `order with ${req.params.id} deleted` ,
  });
})

module.exports = { getAllOrders, createOrder, updateOrder,deleteOrder,getOrderBYId };
