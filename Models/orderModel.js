const mongoose = require("mongoose");

const orderModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "order must belong to a user"],
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, default: 1 },
        totalPriceItems: Number,
        size: String,
        color: String,
      },
    ],
    totalPriceOrder: Number,
    status: {
      type: String,
      enum: ["pending", "shipping", "Delivered", "Cancelled"],
      default: "pending",
    },
    paymentInfo: {
      method: {
        type: String,
        enum: ["credit", "vodafone cash"],
      },
      paidAt: { type: Date, default: Date.now() },
    },
    shippingAddress: {
      type: String,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const order = mongoose.model("Order", orderModel);

module.exports = order;
