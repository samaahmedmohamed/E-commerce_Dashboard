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
      select: false, //to prevent auto return of password
    },
    role: {
      type: String,
      enum: {
        values: ["customer", "admin", "manger"],
        message: "role should be customer / admin /manger",
      },
      default: "customer",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const User = mongoose.model("users", userSchema);
module.exports = User;
