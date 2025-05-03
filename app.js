const express = require("express");
const app = express();
// const path = require("path");
app.use(express.json());
const signupRouter = require("./Routes/userRoutes");
const loginRouter = require("./Routes/loginRoutes");
const productRoutes = require("./Routes/productRoutes");
const userRoutes = require("./Routes/usersRouter");
const adminRoutes = require("./Routes/adminRoutes");
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/admins", adminRoutes);

module.exports = app;
