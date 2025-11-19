import jwt from "jsonwebtoken";
import config from "../config/config.js";
import model from "../models/index.js";

const generateToken = function (user, secret, expiration) {
  return jwt.sign(user, secret, {
    expiresIn: expiration,
  });
};

export const generateAccessToken = (user) =>
  generateToken(user, config.accessSecret, config.accessTokenExpiration);

export const generateRefreshToken = (user) =>
  generateToken(user, config.refreshSecret, config.refreshTokenExpiration);

export const generateAdminAccessToken = (user) =>
  generateToken(user, config.adminAccessSecret, config.accessTokenExpiration);

export const generateAdminRefreshToken = (user) =>
  generateToken(user, config.adminRefreshSecret, config.refreshTokenExpiration);

export const issueToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.refreshSecret);
    const { id, restaurant_id, name, mobile } = decoded;
    const user = {
      id,
      name,
      mobile,
      restaurant_id,
    };

    return generateAccessToken(user);
  } catch (error) {
    throw error;
  }
};

const extractToken = (authHeader) => {
  if (!authHeader) return null;
  // Support both "Bearer <token>" and raw token
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.replace("Bearer ", "").trim();
  }
  return authHeader.trim();
};

const validateRestaurantHeaders = async (req, res) => {
  const appCode = req.headers["x-app-code"];
  const apiKey = req.headers["x-api-key"];

  if (!appCode || !apiKey) {
    res.status(400).json({
      success: false,
      message: "x-app-code and x-api-key headers are required",
    });
    return null;
  }

  const restaurant = await model.Restaurant.findOne({
    where: {
      restaurant_code: appCode,
      api_key: apiKey,
      is_active: true,
    },
  });

  if (!restaurant) {
    res.status(401).json({
      success: false,
      message: "Invalid app code or API key",
    });
    return null;
  }

  // Attach to req for downstream use
  req.restaurant = {
    id: restaurant.id,
    code: restaurant.restaurant_code,
    apiKey: restaurant.api_key,
    name: restaurant.name,
  };

  return restaurant;
};

const verifyAccessToken = (token,secret) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

export const restaurantIdentifier = async (req, res, next) => {
  try {
    const restaurant = await validateRestaurantHeaders(req, res);
    if (!restaurant) return; // response already sent
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

export const userAppAuth = async (req, res, next) => {
  try {
    const restaurant = await validateRestaurantHeaders(req, res);
    if (!restaurant) return;

    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token not provided",
      });
    }

    const { exp } = jwt.decode(token) || {};
    if (!exp || exp * 1000 < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }

    const decoded = verifyAccessToken(token, config.accessSecret);
    // you can add more user fields here based on what you sign into the token
    const { id, name, restaurant_id, mobile } = decoded;
    if (restaurant_id !== req.restaurant.id){
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = {
      id,
      name,
      mobile,
      restaurant_id,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const adminAppAuth = async (req, res, next) => {
  try {
    const restaurant = await validateRestaurantHeaders(req, res);
    if (!restaurant) return;

    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token not provided",
      });
    }

    const { exp } = jwt.decode(token) || {};
    if (!exp || exp * 1000 < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }

    const decoded = verifyAccessToken(token, config.adminAccessSecret);
    // assuming admin token includes role or something similar
    const { id, name, email, role, restaurant_id } = decoded;

    if (restaurant_id !== req.restaurant.id){
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.admin = {
      id,
      name,
      restaurant_id,
      role,
      email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
