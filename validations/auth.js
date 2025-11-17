import Joi from "joi";

const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of 2 characters",
    "string.max": "Name should have a maximum length of 100 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Please provide a valid email address",
  }),
  mobile: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .required()
    .messages({
      "string.empty": "Mobile number cannot be empty",
      "string.pattern.base":
        "Mobile number must be a valid 7 to 15 digit number",
    }),
  country_code: Joi.string().required().messages({
    "string.empty": "Country code cannot be empty",
  }),
  dob: Joi.date().iso().required().messages({
    "date.base": "Date of Birth must be a valid date",
    "any.required": "Date of Birth is required",
  }),
  referral_code: Joi.string().optional().allow("").messages({
    "string.base": "Referral code must be a string",
  }),
}).required();

export { registerUserSchema };
