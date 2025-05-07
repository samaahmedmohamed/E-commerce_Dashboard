const orderModel = require("../Models/orderModel");
const productModel = require("../Models/productModel");
const userModel = require("../Models/userModel");

const catchAsync = require("../utilities/catchAsync");

const getAllOrders = catchAsync(async (req, res) => {
  const data = await orderModel.find({});
  // .populate("user")
  // .populate("items.product");

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

const createOrder = catchAsync(async (req, res) => {
  const itemsWithPrices = await Promise.all(
    req.body.items.map(async (item) => {
      const product = await productModel.findById(item.product);
      const itemTotal = product.price * item.quantity;

      return {
        ...item,
        totalPrice: itemTotal,
      };
    })
  );
  const orderTotalPrice = itemsWithPrices.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const order = await orderModel.create({
    ...req.body,
    items: itemsWithPrices,
    totalPrice: orderTotalPrice,
  });

  res.status(200).json({
    status: "success",
    results: order,
  });
});
const updateOrder = catchAsync(async (req, res) => {
  const order = await orderModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  res.status(200).json({
    status: "success",
    message: "Updated successfully",
    results: order,
  });
});

module.exports = { getAllOrders, createOrder, updateOrder };
