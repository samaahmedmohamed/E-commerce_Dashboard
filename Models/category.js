
const mongoose = require("mongoose");
const categorySchema=new mongoose.Schema(
    {
       name:{
        type:String,
        required:[true,"please write name of category"],
        unique:true,
    },
    description:{
        type:String,
        default:""
    },
    
    imgUrl: {
        type:String,
        required:[true,"plese ineter img of category"]
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
      isDeleted: {
        type: Boolean,
        default: false
      }

    }
)
const Category=mongoose.model("Category",categorySchema);
module.exports=Category;