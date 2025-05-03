const orderModel = require("../Models/orderModel");
const catchAsync = require("../utilities/catchAsync");

const getDashBoardRequirements = catchAsync(async (req, res, next) => {
  const NumberOfOrders = await orderModel.countDocuments();

});
