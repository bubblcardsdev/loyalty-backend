import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
  PORT: Joi.number().default(8000),
  ACCESS_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRATION: Joi.number().required(),
  REFRESH_SECRET: Joi.string().required(),
  REFRESH_TOKEN_EXPIRATION: Joi.number().required(),
  DB_URL: Joi.string().required(),
  FRONTEND_URL: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config Validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  accessSecret: envVars.ACCESS_SECRET,
  accessTokenExpiration: envVars.ACCESS_TOKEN_EXPIRATION,
  refreshSecret: envVars.REFRESH_SECRET,
  refreshTokenExpiration: envVars.REFRESH_TOKEN_EXPIRATION,
  mysql: {
    host: envVars.DB_URL,
  },
  frontEndUrl: envVars.FRONTEND_URL,
};

export default config;
