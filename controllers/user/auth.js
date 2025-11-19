import {
  loginSchema,
  otpSchema,
  registerUserSchema,
  verifyOtpSchema,
} from "../../validations/user/auth.js";
import model from "../../models/index.js";
import { Op, UniqueConstraintError } from "sequelize";
import { sendSms } from "../../middleware/sms.js";
import { genOtp, nowPlusMinutes } from "../../helpers/otp.js";
import logger from "../../config/logger.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../middleware/token.js";

const registerUser = async (req, res) => {
  try {
    const { error } = registerUserSchema.validate(req.body, {
      abortEarly: false,
    });

    console.log(error, "error?.details");

    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const { name, email, mobile, country_code, dob, referral_code } = req.body;

    console.log(req.body, "req.body");
    console.log(req.restaurant, "req.restaurant");

    let refUser;

    if (referral_code) {
      refUser = await model.User.findOne({
        where: {
          reference_code: referral_code,
          restaurant_id: req.restaurant.id,
        },
      });

      if (!refUser?.id) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid referral code" });
      }
    }

    const user = await model.User.create({
      name,
      email,
      mobile,
      country_code,
      dob: dob || null,
      restaurant_id: req.restaurant.id,
    });

    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "User creation failed" });
    }

    const otp = genOtp();

    await model.UserOtp.create({
      user_id: user.id,
      otp: otp,
      expires_at: nowPlusMinutes(10), // OTP valid for 10 minutes
    });

    await sendSms(
      mobile,
      `Your verification code is ${otp}. Please use this to verify your phone number.`
    );

    if (refUser?.id) {
      console.log(`Referral: User ${refUser.id} referred new user ${user.id}`);

      await model.UserReferral.create({
        user_id: user.id,
        referred_by_id: refUser.id,
      });
    }

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log("Register User Error ----------- ", error);
    logger.error("Register User Error ----------- ", error);
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({
        success: false,
        message: error.errors[0].message.includes("email")
          ? "A user with this email already exists."
          : "A user with this mobile number already exists.",
      });
    }
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

const getOtp = async (req, res) => {
  try {
    const { error } = otpSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const { mobile, country_code } = req.body;

    const checkUser = await model.User.findOne({
      where: {
        mobile: mobile,
        country_code: country_code,
        restaurant_id: req.restaurant.id,
      },
    });

    if (!checkUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const otp = genOtp();

    await model.UserOtp.destroy({
      where: {
        user_id: checkUser.id,
        is_used: false,
      },
    });

    await model.UserOtp.create({
      user_id: checkUser.id,
      otp: otp,
      expires_at: nowPlusMinutes(10), // OTP valid for 10 minutes
    });

    await sendSms(
      mobile,
      `Your verification code is ${otp}. Please use this to verify your phone number.`
    );

    return await res
      .status(200)
      .json({ success: true, message: "OTP Sent successfully" });
  } catch (error) {
    console.log("Get Otp Error ----------- ", error);
    logger.error("Get Otp Error ----------- ", error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { error } = verifyOtpSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const { mobile, otp, country_code } = req.body;

    const user = await model.User.findOne({
      where: {
        mobile: mobile,
        country_code: country_code,
        restaurant_id: req.restaurant.id,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const userOtp = await model.UserOtp.findOne({
      where: {
        user_id: user.id,
        otp: otp,
        expires_at: {
          [Op.gt]: new Date(),
        },
      },
      order: [["createdAt", "DESC"]],
    });

    if (!userOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    await userOtp.update({ is_used: true });
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      verificationId: userOtp.id,
    });
  } catch (error) {
    console.log("Verify Otp Error ----------- ", error);
    logger.error("Verify Otp Error ----------- ", error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const { mobile, country_code, verificationId } = req.body;

    const user = await model.User.findOne({
      where: {
        mobile: mobile,
        country_code: country_code,
        restaurant_id: req.restaurant.id,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const userOtp = await model.UserOtp.findOne({
      where: {
        id: verificationId,
        user_id: user.id,
        is_used: true,
        expires_at: {
          [Op.gt]: new Date(),
        },
      },
    });
    if (!userOtp) {
      return res.status(401).json({
        success: false,
        message: "Invalid Verification Code. Please verify your mobile again.",
      });
    }
    const payload = {
      id: user.id,
      restaurant_id: user.restaurant_id,
      name: user.name,
      mobile: user.mobile,
    };
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);
    const userDetails = {
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      country_code: user.country_code,
      dob: user.dob,
      cardcode: user.cardcode,
      reference_code: user.reference_code,
    };

    await model.UserOtp.destroy({
      where: {
        user_id: user.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
        user: userDetails,
      },
    });
  } catch (error) {
    console.log("Login User Error ----------- ", error);
    logger.error("Login User Error ----------- ", error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

const getRestaurantInfo = async (req, res) => {
  try {
    const restaurant = await model.Restaurant.findByPk(req.restaurant.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "api_key", "is_active", "id"],
      },
      include: {
        model: model.Point,
        as: "Point",
        attributes: { exclude: ["createdAt", "updatedAt", "restaurant_id"] },
      },
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    return res.json({
      success: true,
      message: "Restaurant info fetched successfully",
      data: restaurant,
    });
  } catch (error) {
    console.log("Get Restaurant Info Error ----------- ", error);
    logger.error("Get Restaurant Info Error ----------- ", error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

export { registerUser, getOtp, verifyOtp, loginUser, getRestaurantInfo };
