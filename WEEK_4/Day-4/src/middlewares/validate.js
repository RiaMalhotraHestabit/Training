// src/middlewares/validate.js
const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,   // show all errors
      stripUnknown: true, // remove unexpected fields
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    req[property] = value;
    next();
  };
};

export default validate;
