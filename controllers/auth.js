import { registerUserSchema } from "../validations/auth.js";
import model from "../models/index.js";
import { genOtp } from "../lib/utils.js";
import { UniqueConstraintError } from "sequelize";
import { sendSms } from "../middleware/sms.js";

const registerUser = async (req, res) => {
  try {
    const { error } = registerUserSchema.validate(req.body,{
      abortEarly: false,
    });

    console.log(error,"error?.details");

    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const { name, email, mobile, country_code, dob, referral_code } = req.body;

    const otp = genOtp();

    // const user = await model.User.create({
    //   name,
    //   email,
    //   mobile,
    //   country_code,
    //   dob,
    //   referral_code,
    //   otp,
    // });

    await sendSms(
      mobile,
      `Your verification code is ${otp}. Please use this to verify your phone number.`
    );

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log("Register User Error ----------- ", error);
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({
        success: false,
        message:
          "A user with this mobile number already exists in the restaurant.",
      });
    }
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

export { registerUser };
