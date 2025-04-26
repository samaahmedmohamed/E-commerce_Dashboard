const mongoose= require("mongoose")
const app = require("./app")
const dotenv=require("dotenv")
dotenv.config({path:"./config.env"})
const User =require("./Models/userModel")

const DB = process.env.DATABASE.replace(
  '<PASSWORD>' , 
  process.env.DATABASE_PASSWORD
)

mongoose.connect(DB).then((con)=>{
  console.log('MongoDB connected successfully');
})

// async function createUser() {
//   try {
//     const newUser = await User.create({
//       firstName: "Ahmed",
//       lastName: "Ali",
//       email: "ahmed.ali@example.com",
//       password: "password123",
//       // passwordConfirm: "password123",
//       // role: "customer"
//     });
//     console.log("New User Created:", newUser);
//   } catch (err) {
//     console.log("Error creating user:", err);
//   }
// }

// createUser();

// async function getAllUsers() {
//   try {
//     const users = await User.find();
//     console.log("All Users:", users);
//   } catch (err) {
//     console.log("Error fetching users:", err);
//   }
// }

// getAllUsers();


const PORT =process.env.PORT || 3000;
const server =app.listen(PORT , ()=>{
  console.log(`Running on port ${PORT}`);
});


