const categoryValidation=require('../utilities/validation/categoryValdition');
const categoryMiddelWare=(req,res,next)=>{
const result=categoryValidation(req.body);
if(result.error){
    res.status(400).json({message:result.error.details[0].message});
}
else next();
}
module.exports=categoryMiddelWare