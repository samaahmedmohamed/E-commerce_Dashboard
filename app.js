const express = require("express");
const app = express();
app.use(express.json());
const signupRouter = require("./Routes/userRoutes");
const loginRouter = require("./Routes/loginRoutes");
const productRoutes=require('./Routes/productRoutes');
const userRoutes=require('./Routes/usersRouter');
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/users",userRoutes);
app.use("/products",productRoutes);

module.exports = app;
