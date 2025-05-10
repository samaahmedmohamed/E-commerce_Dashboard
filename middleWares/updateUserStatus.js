// const order = require("../Models/orderModel")
const orderModel = require("../Models/orderModel");
const userModel = require("../Models/userModel");

const updateUserStatus = async (id) => {
  const orderCount = await orderModel.countDocuments({ user: id });
  console.log(`User ${id} has ${orderCount} orders`);

  await userModel.findByIdAndUpdate(id, {
    isActive: orderCount > 0,
    isVip: orderCount > 2,
  });
};

module.exports = updateUserStatus;
