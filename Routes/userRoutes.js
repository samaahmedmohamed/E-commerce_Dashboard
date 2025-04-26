const express=require("express")
const router =express.Router()
const signup =require("../Controllers/authController")

router.post("/" ,signup)
module.exports=router