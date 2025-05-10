const Joi = require("joi");
const validateUser = (user) => {
  const Schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .pattern(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .required()
      .messages({ "string.pattern.base": "Email must be a valid format" }),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid("customer", "admin", "manger"),
  }).unknown(false);
  return Schema.validate(user);
};

module.exports = validateUser;
// const value = Schema.validate({
//   firstName: "me",
//   lastName: "ahmed",
//   email: "menna@gmal",
//   password: "123456",
// });
// console.log(value);
// console.log("err detailes ",value.error.details)
// console.log("error is",value.error.details[0].message);
