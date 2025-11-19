"use strict";
const { Model } = require("sequelize");

// cache the imported ESM module so we don't re-import on every call
let codeHelpersPromise;
const getCodeHelpers = async () => {
  if (!codeHelpersPromise) {
    codeHelpersPromise = import("../helpers/generateCode.js"); // ESM helper
  }
  return codeHelpersPromise;
};

module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
      User.hasMany(models.UserTier, { foreignKey: "user_id" });
      User.hasMany(models.RedeemedOffer, { foreignKey: "user_id" });
      User.hasMany(models.UserPointHistory, { foreignKey: "user_id" });
      User.hasMany(models.Activity, { foreignKey: "user_id" });
      User.hasMany(models.UserOtp, { foreignKey: "user_id" });
    }
  }

  User.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      cardcode: { type: Sequelize.STRING, allowNull: false, unique: true },
      email: { type: Sequelize.STRING, allowNull: false },
      mobile: { type: Sequelize.STRING, allowNull: false },
      dob: { type: Sequelize.DATE, allowNull: true },
      country_code: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      img_key: { type: Sequelize.STRING },
      phoneVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      reference_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  // ✅ Hook to auto-generate unique reference_code BEFORE validation
  User.beforeValidate(async (user, options) => {
    const transaction = options?.transaction;

    const { generateUniqueValue, generateAppCode } = await getCodeHelpers();
    const restaurant = await sequelize.models.Restaurant.findByPk(
      user.restaurant_id,
      { transaction }
    );
    const prefix = restaurant?.name.slice(0, 2).toUpperCase();

    if (!user.cardcode) {
      user.cardcode = await generateUniqueValue({
        model: User,
        field: "cardcode",
        generateFn: () => generateAppCode(prefix), // or adjust prefix as per your helper
        maxRetries: 10,
        transaction,
      });
    }

    if (!user.reference_code) {
      user.reference_code = await generateUniqueValue({
        model: User,
        field: "reference_code",
        generateFn: () => generateAppCode("LY"), // or adjust prefix as per your helper
        maxRetries: 10,
        transaction,
      });
    }
  });

  return User;
};
