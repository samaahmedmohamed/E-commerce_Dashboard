const userModel = require("../Models/userModel");
const catchAsync = require("../utilities/catchAsync");
const createUser = catchAsync(async (req, res) => {
  // const user = req.body;
  // console.log(`User:${user}`);
  // console.log("User:", JSON.stringify(user, null, 2));
  // // return res.status(200).json({ message: "LOGGED IN successfully" });
  // return res.status(400).json({ message: "gggggggg" });
  const newUser = await userModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  });
  res.status(200).json({
    status: "success",
    data: newUser,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userModel.find({});
  res.status(200).json({
    status: "success",
    data: { users },
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  console.log(user);

  if (!user) {
    return next(new AppError("No user Exists with that id", 400));
  }
  res.status(200).json({
    status: "success",
    data: { user },
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
  const user = await userModel.findByIdAndDelete(req.params.id);
  console.log(user);

  if (!user) return res.status(400).json({ message: "user is not found" });
  res.status(200).json({
    status: "Success",
    data: null,
  });
});

module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser };
