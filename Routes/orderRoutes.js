const express = require("express");
const router = express.Router();
const { getAllOrders,createOrder,updateOrder}=require("../Controllers/orderController");
router.get("/",getAllOrders),
router.post("/",createOrder),
router.patch('/:id',updateOrder);
module.exports=router;