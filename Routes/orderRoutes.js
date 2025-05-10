const express = require("express");
const router = express.Router();
const { getAllOrders,createOrder,updateOrder,deleteOrder, getOrderBYId}=require("../Controllers/orderController");
router.get("/",getAllOrders),
router.post("/",createOrder),
router.patch('/:id',updateOrder);
router.delete('/:id',deleteOrder);
router.get("/:id",getOrderBYId)

module.exports=router;