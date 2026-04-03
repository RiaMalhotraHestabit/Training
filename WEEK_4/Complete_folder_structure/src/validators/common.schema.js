import Joi from "joi";

export const mongoIdSchema = Joi.object({
  id: Joi.string()
    .length(24)
    .hex()
    .required(),
});
