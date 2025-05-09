const { options } = require("../app");
const userModel = require("../Models/userModel");
const catchAsync = require("../utilities/catchAsync");
const bcrypt = require("bcrypt");
// let salt = bcrypt.genSaltSync(10);

const createUser = catchAsync(async (req, res) => {
  const passHashed = await bcrypt.hash(req.body.password, 10);

  // const user = req.body;
  // console.log(`User:${user}`);
  // console.log("User:", JSON.stringify(user, null, 2));
  // // return res.status(200).json({ message: "LOGGED IN successfully" });
  // return res.status(400).json({ message: "gggggggg" });
  // const userorder = await userModel.findById(req.params.id).populate('orders');
//  console.log(user.orders);
  const newUser = await userModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    password: passHashed,
  });
  res.status(200).json({
    status: "success",
    data: {user:newUser},
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const queryObj = {};
  //search
  const userorder = await userModel.findById(req.params.id).populate('orders');
  if (req.query.name) {
    queryObj.$or = [
      { firstName: { $regex: req.query.name, $options: "i" } },
      { lastName: { $regex: req.query.name, $options: "i" } },
    ];
  }

  //filter by role
  if (req.query.role) {
    queryObj.role = req.query.role;
  }
  // queryObj.isDeleted = { $ne: true };    for show the users which is not soft deleted only
  const users = await userModel.find(queryObj).populate('orders');
  res.status(200).json({
    status: "success",
    data: { users },
  });
});

const getUser = catchAsync(async (req, res, next) => {
 
  
  // const user = await userModel.findById(req.params.id).populate('orders');
  const user = await userModel.findById(req.params.id).populate({
  path: 'orders',
  populate: {
    path: 'items.product',
    model: 'products', 
    select: 'name price brand  images'
  }
});

 console.log(user.orders);

  if (!user) {
    return next(new AppError("No user Exists with that id", 400));
  }
  res.status(200).json({
    status: "success",
    data: { user:user },
    
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) return res.status(400).json({ message: "nothing to update" });
  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  // const user = await userModel.findByIdAndDelete(req.params.id);
  const user = await userModel.findByIdAndUpdate(req.params.id, {
    isDeleted: true,
    // runValidators:true
    new: true,
  });
  console.log(user);

  if (!user) return res.status(400).json({ message: "user is not found" });
  res.status(200).json({
    status: "Success",
    message: "product soft deleted succesfully",
    // data: null,
  });
});

module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser };
