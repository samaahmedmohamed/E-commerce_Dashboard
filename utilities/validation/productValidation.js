const Joi=require('joi');
const validateProduct=(product)=>{
    const Schema = Joi.object({
        name: Joi.string().regex(/^\D+$/).required().messages({"string.pattern.base": "Name must not be only numbers"}),
        // brand: Joi.string().required(),
        // price:Joi.number().min(0).required(),
        // description:Joi.string().required(),
        // color:Joi.array().items(Joi.string().min(1)).required(),
        // material:Joi.string().required(),
        // inStock:Joi.number().min(0).required(),
        // sizeRange:Joi.array().items(Joi.string().min(1).valid("XS", "S", "M", "L", "XL", "2XL", "3XL")).required(),
        // gender:Joi.array().items(Joi.string().valid("men", "women")).required(),
        // category:Joi.string().required(),
    //    imageUrl:Joi.array().items(Joi.string()).required(),
       quantity:Joi.number().min(1).default(1),
       isDeleted:Joi.boolean().default(false),


    }).unknown(false);
    return Schema.validate(product);
    
}
module.exports=validateProduct;