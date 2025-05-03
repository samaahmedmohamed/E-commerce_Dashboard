const mongoose = require("mongoose");
const validator = require("validator");
const { validate } = require("./userModel");

const productModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "A brand must have a name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A product must have price"],
    },
    description: {
      type: String,
      required: [true, "A product must have description"],
      trim: true,
    },
    color: {
      //خلي اللون array
      type: [String],
      required: [true, "A product must have a color"],
      trim: true,
    },
    material: {
      type: String,
      required: [true, "A product must have a material"],
      trim: true,
    },
    inStock: {
      type: Number,
      required: [true, "A product must have a stock"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    sizeRange: {
      type: [String],
      enum: {
        values: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        message: `size range must be "XS" , "S" , "M" , "L" , "XL" , "2XL"  or "3XL"`,
      },
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    gender: {
      type: [String],
      enum: {
        values: ["men", "women"],
        message: "gender must be men or women",
      },
      validate: {
        validator: function (value) {
          return new Set(value).size === value.length; ///it is comparing not assigning
        },
      },
      required: true,
    },
    imageUrl: {
      type: [String],
      required: [true, "A product must have image"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const product = mongoose.model("products", productModel);
module.exports = product;
