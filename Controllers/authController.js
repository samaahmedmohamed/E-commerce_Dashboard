const userModel =require("../Models/userModel")
const bcrypt=require("bcrypt")

let signup =async (req , res )=>{
    let user = req.body;
    let foundUser = await userModel.findOne({email:user.email.toLowerCase()})
    if(foundUser) res.status(200).json({message:'Already exist plz login !'})
    let salt =bcrypt.genSaltSync(10)
    let passHashed=await  bcrypt.hash(user.password , salt)
    user.password= passHashed
    user.email=user.email.toLowerCase();
    let newUser= new userModel(user)
    newUser.save()
    res.status(201).json({message:"added successfully" , data:newUser})
}



module.exports= signup 