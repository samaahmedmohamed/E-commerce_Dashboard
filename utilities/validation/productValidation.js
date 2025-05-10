const Joi=require('joi');
const validateProduct=(product)=>{
    const Schema = Joi.object({
        name: Joi.string()
        .pattern(/^(?!\d+$).+/)
        .required()
        .messages({
          "string.pattern.base": "Name must not be only numbers",
        }),      
        brand: Joi.string().pattern(/^(?!\d+$).+/).required().messages({
            "string.pattern.base": "brand must not be only numbers",
          }),
         price:Joi.number().min(0).required(),
        description:Joi.string(),
        color:Joi.array().items(Joi.string().regex(/^\D+$/).min(1)).required().messages({
            "string.pattern.base": "color must be string",
          }),
        material:Joi.string().pattern(/^(?!\d+$).+/).required(),
        inStock:Joi.number().min(0).required(),
        sizeRange:Joi.array().items(Joi.string().min(1).valid("XS", "S", "M", "L", "XL", "2XL", "3XL")).required(),
        gender:Joi.array().items(Joi.string().valid("men", "women")).required(),
        category:Joi.string().required(),
        images:Joi.array().items(Joi.string()),
       quantity:Joi.number().min(1).default(1),
    }).unknown(false);
    return Schema.validate(product);
    
}
module.exports=validateProduct;