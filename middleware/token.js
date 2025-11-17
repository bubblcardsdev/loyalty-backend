/* eslint-disable no-useless-catch */
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import model from "../models/index.js";


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
      data: { message: "x-app-code and x-api-key headers are required" }
    });
    return null;
  }

  const restaurant = await model.Restaurant.findOne({
    where: {
      restaurant_code: appCode,
      api_key: apiKey,
      is_active: true
    }
  });

  if (!restaurant) {
    res.status(401).json({
      success: false,
      data: { message: "Invalid app code or API key" }
    });
    return null;
  }

  // Attach to req for downstream use
  req.restaurant = {
    id: restaurant.id,
    code: restaurant.restaurant_code,
    apiKey: restaurant.api_key,
    name: restaurant.name
  };

  return restaurant;
};

const verifyAccessToken = (token) => {
  const decoded = jwt.verify(token, config.accessSecret);
  return decoded;
};

// -----------------------------
// USER MIDDLEWARES
// -----------------------------

/**
 * USER BEFORE LOGIN
 * 1) check app code, api key and set in req object before login
 *    (for endpoints like /user/login, /user/register, etc.)
 */
export const userAppAuthPreLogin = async (req, res, next) => {
  try {
    const restaurant = await validateRestaurantHeaders(req, res);
    if (!restaurant) return; // response already sent
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: { message: "Something went wrong", error: err.message }
    });
  }
};

/**
 * USER AFTER LOGIN
 * 1) check app code, api key and token and set in req object after login
 *    (for protected user APIs)
 */
export const userAppAuth = async (req, res, next) => {
  try {
    const restaurant = await validateRestaurantHeaders(req, res);
    if (!restaurant) return;

    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        data: { message: "Authorization token not provided" }
      });
    }

    const { exp } = jwt.decode(token) || {};
    if (!exp || exp * 1000 < Date.now()) {
      return res.status(401).json({
        success: false,
        data: { message: "Token has expired" }
      });
    }

    const decoded = verifyAccessToken(token);
    // you can add more user fields here based on what you sign into the token
    const { id, firstName, lastName, email, phoneNumber } = decoded;

    req.user = {
      id,
      firstName,
      lastName,
      email,
      phoneNumber
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: { message: "Invalid token", error: error.message }
    });
  }
};

// -----------------------------
// ADMIN MIDDLEWARES
// -----------------------------

/**
 * ADMIN BEFORE LOGIN (APP)
 * 2) check app code, api key and set in req object before login // for app
 *    (e.g., /admin/login on mobile app)
 */
export const adminAppAuthPreLogin = async (req, res, next) => {
  try {
    const restaurant = await validateRestaurantHeaders(req, res);
    if (!restaurant) return;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: { message: "Something went wrong", error: err.message }
    });
  }
};

/**
 * ADMIN AFTER LOGIN (APP)
 * 1) check app code, api key and token and set in req object after login.
 *    (protected admin APIs used by the app)
 */
export const adminAppAuth = async (req, res, next) => {
  try {
    const restaurant = await validateRestaurantHeaders(req, res);
    if (!restaurant) return;

    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        data: { message: "Authorization token not provided" }
      });
    }

    const { exp } = jwt.decode(token) || {};
    if (!exp || exp * 1000 < Date.now()) {
      return res.status(401).json({
        success: false,
        data: { message: "Token has expired" }
      });
    }

    const decoded = verifyAccessToken(token);
    // assuming admin token includes role or something similar
    const { id, name, email, role } = decoded;

    req.admin = {
      id,
      name,
      email,
      role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: { message: "Invalid token", error: error.message }
    });
  }
};

/**
 * ADMIN WEB (NO HEADER CHECKS)
 * 3) check nothing // for web
 *    (e.g., your web admin panel might use cookies / sessions instead)
 */
export const adminWebAuth = (req, res, next) => {
  // You can still plug in session/cookie-based logic here if needed
  // For now: "check nothing" as requested.
  next();
};
