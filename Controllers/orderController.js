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
    isDeleted: false,
  });

  const newProduct = await productModel.countDocuments({
    createdAt: { $gte: weekAgo, $lte: new Date() },
    isDeleted: false,
  });

  const newOrder = await orderModel.countDocuments({
    createdAt: { $gte: weekAgo, $lte: new Date() },
    status: { $ne: "Cancelled" },
    // status: { enum: ["pending", "shipping", "Delivered"] },
  });

  ////////
  const userCount = await userModel.countDocuments();
  const userActive = await userModel.countDocuments({ status: "active" });
  const userInActive = await userModel.countDocuments({ status: "inactive" });
  const userVip = await userModel.countDocuments({ status: "vip" });
  /////////

  res.status(200).json({
    status: "success",
    results: data.length,
    NumberOfOrders: NumberOfOrders,
    totalRevenue: totalRevenue,
    averageOrderValue: avg_order_value,
    newCustomers: newCustomers,
    newProduct: newProduct,
    newOrder: newOrder,
    userCount: userCount,
    userActive: userActive,
    userInActive: userInActive,
    userVip: userVip,
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
      // <<<<<<< sama
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
  // =======
  //       // const itemTotal = product.price * item.quantity;
  //       item.totalPriceItems = item.quantity * item.product.price;

  //          console.log(itemTotal);
  //       return {
  //         ...item,
  //         totalPriceItems: item.totalPriceItems,
  //       };
  //     })
  //   );
  //   const orderTotalPrice = itemsWithPrices.reduce((sum, item) => sum + item.totalPriceItems, 0);
  // >>>>>>> develop
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

const getOrderBYId = catchAsync(async (req, res) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user")
    .populate({
      path: "items.product",
      select: "name price brand images",
    });
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json({
    status: "success",
    result: order,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  // <<<<<<< sama
  //   const order = await orderModel.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //     runValidators: true,
  //   });
  // =======
  const { status } = req.body;

  if (!status) {
    return res.status(404).json({ message: "Status is required" });
  }

  const order = await orderModel.findByIdAndUpdate(
    req.params.id,
    { status }, // 👈 تحديث status فقط
    { new: true, runValidators: true }
  );
  // >>>>>>> develop

  if (!order) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  res.status(200).json({
    status: "success",
    message: "Updated successfully",
    results: order,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const Cancelled = await orderModel.findByIdAndUpdate(req.params.id, {
    status: "Cancelled",
  });
  if (!Cancelled) {
    return res.status(400).json({ message: "Nothing to update" });
  }
  await updateUserStatus(order.user);
  res.status(200).json({
    status: "success",
    message: `order with ${req.params.id} deleted`,
  });
});

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderBYId,
};
