const { path } = require("../app");
const productModel = require("../Models/productModel");
const catchAsync = require("../utilities/catchAsync");

const getAllProduct = catchAsync(async (req, res, next) => {
  //Build Query//
  const queryObject = { ...req.query };

  const excludedFields = ["page", "limit", "sort", "fields"];
  excludedFields.forEach((el) => delete queryObject[el]);

  ////// filter with price & gender  =====  add $ before (gt|gte|lt|lte)  ///////
  const queryString = JSON.stringify(queryObject).replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );

  const filter = JSON.parse(queryString);

  ///////filter with gender///////
  if (req.query.gender) {
    const genderArray = req.query.gender.split(",");
    filter.gender = { $in: genderArray };
  }

  ///// filter with category ////

  ///////////////////////////////////

  ///Buid Query depends on filter //
  let query = productModel.find(filter);

  ///sort by price | Date ///
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  /// selection by fields //
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  /// pagination ///
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const skip = (page - 1) * limit;

  let numProducts;
  if (req.query.page) {
    numProducts = await productModel.countDocuments(query);
    query = query.skip(skip).limit(limit);
    if (skip >= numProducts) {
      throw new Error("this product doesnot exist");
    }
  }

  /// Execute products ///
  let products = await query;

  res.status(200).json({
    status: "success",
    results: products.length,
    numProducts,
    data: {
      products,
    },
  });
});

const getProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await productModel.findById(id);
  res.status(200).json({
    status: "success",
    data: { product },
  });
});

const createProduct = catchAsync(async (req, res, next) => {
  // console.log(req.body.name);
  const exsitingProduct = await productModel.findOne({ name: req.body.name });
  console.log(exsitingProduct);
  if (exsitingProduct) {
    res.status(400).json({
      status: "fail",
      message: "product name already exist",
    });
  } else {
    // const imagePaths = req.files ? req.files.map((file) => file.path) : [];
    const imagePaths = req.files.map(file => `/images/upload/${file.filename}`);


    const productData = {
      ...req.body,
      imageUrl: imagePaths,
    };
    const newProduct = await productModel.create(productData);
    res.status(201).json({
      status: "success",
      data: { newProduct },
    });
  }
});

const updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedProduct) {
    throw new Error("nothing to update");
  }
  res.status(200).json({
    status: "success",
    data: { updatedProduct },
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const deletedProduct = await productModel.findByIdAndUpdate(req.params.id, {
    isDeleted: true,
    new: true,
  });
  if (!deletedProduct) {
    throw new Error("nothing to delete");
  }
  res.status(200).json({
    status: "success",
    message: "product soft Deleted",
    // data: null,
  });
});

module.exports = {
  getAllProduct,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
};
