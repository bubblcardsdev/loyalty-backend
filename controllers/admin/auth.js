import model from "../../models/index.js";
import { generateAdminAccessToken, generateAdminRefreshToken } from "../../middleware/token.js";
import { admiLoginSchema, admiRegisterSchema } from "../../validations/admin/auth.js";
import logger from "../../config/logger.js";
import { comparePassword, hashPassword } from "../../middleware/password.js";

 const adminLogin = async (req, res) => {
  try {
    const { error } = admiLoginSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { email, password } = req.body;

    const where = req?.restaurant?.id ? { email, restaurant_id: req.restaurant.id } : { email };

    const adminUser = await model.AdminUser.findOne({
      where: where,
    });

    if (!adminUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const valid = await comparePassword(password, adminUser.password_hash);
    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const restaurant = await model.Restaurant.findByPk(adminUser.restaurant_id);

    const payload = {
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
      restaurant_id: adminUser.restaurant_id,
    };

    const accessToken = generateAdminAccessToken(payload);
    const refreshToken = generateAdminRefreshToken(payload);

    return res.json({
      success: true,
      message: "Admin logged in successfully",
      data: {
        accessToken,
        refreshToken,
        admin: payload,
      },
    });
  } catch (error) {
    console.error("adminLogin error:", error);
    logger.error("Admin Login Error ----------- ", error);
     res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

 const createAdminUser = async (req, res) => {
    try {

        const { error } = admiRegisterSchema.validate(req.body, {
            abortEarly: false,
        })

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        const { name, email, password } = req.body;

        const existingUser = await model.AdminUser.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await hashPassword(password);

         await model.AdminUser.create({
            name,
            email,
            password_hash: hashedPassword,
            restaurant_id: req.restaurant.id,
        });

        return res.json({
            success: true,
            message: "Admin user created successfully",
        });

    } catch (error) {
        console.error("createAdminUser error:", error);
        logger.error("Create Admin User Error ----------- ", error);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
}

export { adminLogin, createAdminUser };