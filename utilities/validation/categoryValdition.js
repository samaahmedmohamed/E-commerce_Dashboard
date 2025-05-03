const Joi =require("joi");
const validateCategory=(category)=>{
    const Schema=Joi.object({
        name:Joi.string().required(),
        description:Joi.string().default(''),
        imgUrl:Joi.string().required(),
        isDeleted:Joi.boolean().default(false)
    }).unknown(false);
   return Schema.validate(category)
}
module.exports=validateCategory