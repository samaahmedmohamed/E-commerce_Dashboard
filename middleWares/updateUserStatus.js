// const order = require("../Models/orderModel")
const orderModel = require("../Models/orderModel");
const userModel = require("../Models/userModel");

const updateUserStatus = async (id) => {
  const orderCount = await orderModel.countDocuments({ user: id });
  console.log(`User ${id} has ${orderCount} orders`);

  let status = "inactive";

  if (orderCount > 0) {
    status = orderCount >= 2 ? "vip" : "active";
  }

  await userModel.findByIdAndUpdate(id, {
    status: status,
  });
};

module.exports = updateUserStatus;
