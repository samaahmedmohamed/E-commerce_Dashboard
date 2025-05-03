const express = require("express");
const userValidation=require('./middleWares/userMiddelWares')
const app = express();
app.use(express.json());
const signupRouter = require("./Routes/userRoutes");
const loginRouter = require("./Routes/loginRoutes");
const productRoutes=require('./Routes/productRoutes');
const userRoutes=require('./Routes/usersRouter');
const categoryRoutes=require('./Routes/categoryRoutes')

app.use("/signup" ,signupRouter);
app.use("/login", loginRouter);
app.use("/users",userRoutes);
app.use("/products",productRoutes);
app.use("/categorys",categoryRoutes)

module.exports = app;
