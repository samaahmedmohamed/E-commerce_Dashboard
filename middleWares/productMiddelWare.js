const productValidation=require('../utilities/validation/productValidation')
function productMiddelWares(req,res,next){
    const result=productValidation(req.body);
     if(result.error){
        res.status(400).json({message:result.error.details[0].message});
     }
     else{next()}
   

}
module.exports=productMiddelWares;