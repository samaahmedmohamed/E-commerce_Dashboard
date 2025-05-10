const { options } = require("../app");
const userModel = require("../Models/userModel");
const adminModel = require("../Models/adminModel");
const catchAsync = require("../utilities/catchAsync");
const bcrypt = require("bcrypt");
const { date } = require("joi");
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
    data: { user: newUser },
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const queryObj = {};
  //search
  const userorder = await userModel.findById(req.params.id).populate("orders");
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
  const userCount = await userModel.countDocuments();
  // queryObj.isDeleted = { $ne: true };    for show the users which is not soft deleted only
  const users = await userModel.find(queryObj).populate("orders");
  res.status(200).json({
    status: "success",
    userCount: userCount,
    data: { users },
  });
});

const getUser = catchAsync(async (req, res, next) => {
  // const user = await userModel.findById(req.params.id).populate('orders');
  const user = await userModel.findById(req.params.id).populate({
    path: "orders",
    populate: {
      path: "items.product",
      model: "products",
      select: "name price brand  images",
    },
  });

  console.log(user.orders);

  if (!user) {
    return next(new AppError("No user Exists with that id", 400));
  }
  res.status(200).json({
    status: "success",
    // <<<<<<< sama
    data: {
      user: user,
      status: user.status,
    },
    // =======
    //     data: { user:user },

    // >>>>>>> develop
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const userBeforeUpdate = await userModel
    .findById(req.params.id)
    .select("+password");
  if (!userBeforeUpdate)
    return res.status(404).json({ message: "user not found" });
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) return res.status(400).json({ message: "nothing to update" });

  if (req.body.role == "admin" && userBeforeUpdate.role !== "admin") {
    const existingAdmin = await adminModel.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).json({
        status: "fail",
        message: "An admin with this email already exists.",
      });
    }
    const newAdmin = await adminModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: userBeforeUpdate.password,
      // ...user,
      role: "admin",
    });

    await userModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      status: "success",
      date: { newAdmin },
      message: "admin added successfully",
    });
  }

  res.status(200).json({
    status: "success",
    data: { user },
    message: "user updated successfully",
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
