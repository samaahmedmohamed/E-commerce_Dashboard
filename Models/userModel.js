const { boolean } = require("joi");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "tell us your first name please !"],
    },
    lastName: {
      type: String,
      required: [true, "tell us your last name please !"],
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
      validate: {
        validator: function (v) {
          return /^01[0-2,5]{1}[0-9]{8}$/.test(v); // Example for Egyptian phone numbers
        },
        message: "Please enter a valid phone number!",
      },
    },
    email: {
      type: String,
      required: [true, "tell us your email plz !"],
      unique: true,
      validate: [validator.isEmail, "please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "please enter 8 digits !"],
      minLength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["customer", "admin", "manger"],
        message: "role should be customer / admin /manger",
      },
      default: "customer",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isVip: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 👉 إضافة الـ virtual
userSchema.virtual("orders", {
  ref: "Order", // اسم الموديل اللي هنعمله populate
  foreignField: "user", // الحقل الموجود في order بيربطه باليوزر
  localField: "_id", // الحقل الموجود في اليوزر
});

const User = mongoose.model("users", userSchema);
module.exports = User;
