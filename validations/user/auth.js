import Joi from "joi";

const registerUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .pattern(/^[a-zA-Z\s]+$/)
    .trim()
    .messages({
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of 2 characters",
      "string.max": "Name should have a maximum length of 100 characters",
      "string.pattern.base": "Name should only contain letters and spaces",
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
  country_code: Joi.string()
    .required()
    .pattern(/^[0-9]{1,3}$/)
    .messages({
      "string.empty": "Country code cannot be empty",
      "string.pattern.base": "Country code must be a valid 1 to 3 digit number",
    }),
  dob: Joi.date()
    .iso()
    .greater("1900-01-01") // not older than 1900
    .less("now") // cannot be in the future
    .optional()
    .allow(null)
    .allow("")
    .messages({
      "date.base": "Date of Birth must be a valid date",
      "date.less": "Date of Birth cannot be in the future",
      "date.greater": "Date of Birth must be after 1900-01-01",
    }),
  referral_code: Joi.string()
    .optional()
    .pattern(/^[a-zA-Z0-9]{11}$/)
    .allow("")
    .messages({
      "string.base": "Referral code must be a string",
      "string.pattern.base":
        "Referral code must be exactly 11 alphanumeric characters",
    }),
}).required();

const otpSchema = Joi.object({
  mobile: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .required()
    .messages({
      "string.empty": "Mobile number cannot be empty",
      "string.pattern.base":
        "Mobile number must be a valid 7 to 15 digit number",
      "string.base": "Mobile number must be a string",
    }),
  country_code: Joi.string()
    .required()
    .pattern(/^[0-9]{1,3}$/)
    .messages({
      "string.empty": "Country code cannot be empty",
      "string.pattern.base": "Country code must be a valid 1 to 3 digit number",
      "string.base": "Country code must be a string",
    })
}).required();

const verifyOtpSchema = Joi.object({
  mobile: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .required()
    .messages({
      "string.empty": "Mobile number cannot be empty",
      "string.pattern.base":
        "Mobile number must be a valid 7 to 15 digit number",
      "string.base": "Mobile number must be a string",
    }),
  country_code: Joi.string()
    .required()
    .pattern(/^[0-9]{1,3}$/)
    .messages({
      "string.empty": "Country code cannot be empty",
      "string.pattern.base": "Country code must be a valid 1 to 3 digit number",
      "string.base": "Country code must be a string",
    }),
  otp: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "string.empty": "OTP cannot be empty",
      "string.pattern.base": "OTP must be a valid 6 digit number",
      "string.base": "OTP must be a string",
    })
}).required();

const loginSchema = Joi.object({
  mobile: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .required()
    .messages({
      "string.empty": "Mobile number cannot be empty",
      "string.pattern.base":
        "Mobile number must be a valid 7 to 15 digit number",
      "string.base": "Mobile number must be a string",
    }),
  country_code: Joi.string()
    .required()
    .pattern(/^[0-9]{1,3}$/)
    .messages({
      "string.empty": "Country code cannot be empty",
      "string.pattern.base": "Country code must be a valid 1 to 3 digit number",
      "string.base": "Country code must be a string",
    }),
  verificationId: Joi.string()
    .uuid()
    .required().messages({
      "string.empty": "Verification ID cannot be empty",
      "string.uuid": "Verification ID must be a valid UUID",
      "string.base": "Verification ID must be a string",
    }),
}).required();

export { registerUserSchema, otpSchema, verifyOtpSchema, loginSchema };