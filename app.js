const express = require("express");
const userValidation=require('./middleWares/userMiddelWares')
const app = express();
const path = require("path");
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
const signupRouter = require("./Routes/userRoutes");
const loginRouter = require("./Routes/loginRoutes");
const productRoutes=require('./Routes/productRoutes');
const userRoutes=require('./Routes/usersRouter');
const categoryRoutes=require('./Routes/categoryRoutes')
const adminRoutes = require("./Routes/adminRoutes");
const ordersRoutes=require("./Routes/orderRoutes")

app.use("/signup" ,signupRouter);
app.use("/login", loginRouter);
app.use("/users",userRoutes);
app.use("/products",productRoutes);
app.use("/categories",categoryRoutes)
app.use("/admins", adminRoutes);
app.use("/orders",ordersRoutes);


module.exports = app;
