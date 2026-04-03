import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required(),

  price: Joi.number()
    .positive()
    .required(),

  category: Joi.string()
    .valid("electronics", "clothing", "books")
    .required(),
});
