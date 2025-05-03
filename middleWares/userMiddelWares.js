const userValidation=require('../utilities/validation/userValidation')
function userMiddelWares(req,res,next){
    const result=userValidation(req.body);
     if(result.error){
        res.status(400).json({message:result.error.details[0].message});
     }
     else{next()}
   

}
module.exports=userMiddelWares;