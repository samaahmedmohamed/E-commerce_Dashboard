const orderModel = require("../Models/orderModel");
const productModel = require("../Models/productModel");
const userModel = require("../Models/userModel");
const mongoose = require("mongoose");

const catchAsync = require("../utilities/catchAsync");
const updateUserStatus = require("../middleWares/updateUserStatus");
const order = require("../Models/orderModel");

const getAllOrders = catchAsync(async (req, res) => {
  /// filter with status
  const { status, page = 1, limit = 8 } = req.query;
  const filter = {};

  if (status) {
    filter.status = status;
  }

  const data = await orderModel
    .find(filter)
    // .skip((page - 1) * limit)
    // .limit(parseInt(limit))
    .populate("user")
    .populate("items.product");
  //orders.length
  const NumberOfOrders = await orderModel.countDocuments(filter);
  //total revenue --- total orders price
  const totalRevenue = data.reduce((acc, item) => {
    // sum = +item.totalPriceOrder;
    return acc + +item.totalPriceOrder || 0;
  }, 0);

  //average order value
  avg_order_value = totalRevenue / NumberOfOrders;

  // NEW Customers / Products /Orders
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const newCustomers = await userModel.countDocuments({
    createdAt: { $gte: weekAgo, $lte: new Date() },
  });

  const newProduct = await productModel.countDocuments({
    createdAt: { $gte: weekAgo, $lte: new Date() },
  });

  const newOrder = await orderModel.countDocuments({
    createdAt: { $gte: weekAgo, $lte: new Date() },
  });

  res.status(200).json({
    status: "success",
    results: data.length,
    NumberOfOrders: NumberOfOrders,
    totalRevenue: totalRevenue,
    averageOrderValue: avg_order_value,
    newCustomers: newCustomers,
    newProduct: newProduct,
    newOrder: newOrder,
    // page,
    // limit,
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
      const itemTotal = product.price * item.quantity;
      console.log(itemTotal);
      return {
        ...item,
        totalPriceItems: itemTotal,
      };
    })
  );
  const orderTotalPrice = itemsWithPrices.reduce(
    (sum, item) => sum + item.totalPriceItems,
    0
  );
  console.log(orderTotalPrice);

  const order = await orderModel.create({
    ...req.body,
    items: itemsWithPrices,
    totalPriceOrder: orderTotalPrice,
  });
  await updateUserStatus(order.user);
  // console.log(order.user);

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
