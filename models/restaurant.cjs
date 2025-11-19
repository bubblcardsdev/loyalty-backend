"use strict";
const { Model } = require("sequelize");

// cache the imported ESM module so we don't re-import on every call
let codeHelpersPromise;
const getCodeHelpers = async () => {
  if (!codeHelpersPromise) {
    codeHelpersPromise = import("../helpers/generateCode.js"); // note the .js extension
  }
  return codeHelpersPromise;
};
module.exports = (sequelize, Sequelize) => {
  class Restaurant extends Model {
    static associate(models) {
      Restaurant.hasMany(models.AdminUser, { foreignKey: "restaurant_id" });
      Restaurant.hasMany(models.User, { foreignKey: "restaurant_id" });
      Restaurant.hasMany(models.UserTier, { foreignKey: "restaurant_id" });
      Restaurant.hasMany(models.Menu, { foreignKey: "restaurant_id" });
      Restaurant.hasMany(models.MenuCategory, { foreignKey: "restaurant_id" });
      Restaurant.hasMany(models.Outlet, { foreignKey: "restaurant_id" });
      Restaurant.hasMany(models.Tier, { foreignKey: "restaurant_id" });
      Restaurant.hasMany(models.Offer, { foreignKey: "restaurant_id" });
      Restaurant.hasOne(models.Point, { foreignKey: "restaurant_id" });
      Restaurant.hasMany(models.UserPointHistory, {
        foreignKey: "restaurant_id",
      });
      Restaurant.hasMany(models.RedeemedOffer, { foreignKey: "restaurant_id" });
      Restaurant.hasMany(models.Activity, { foreignKey: "restaurant_id" });
      Restaurant.hasMany(models.Campaign, { foreignKey: "restaurant_id" });
    }
  }

  Restaurant.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      mobile: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      restaurant_code: { type: Sequelize.STRING, allowNull: false },
      api_key: { type: Sequelize.STRING, allowNull: false },
      app_name: { type: Sequelize.STRING(100), allowNull: false },
      logo_key: { type: Sequelize.STRING(255), allowNull: false },
      background_theme: { type: Sequelize.STRING(100), allowNull: false, defaultValue: "#FF9900" },
      terms_conditions: { type: Sequelize.STRING(255), allowNull: false },
      privacy_policy: { type: Sequelize.STRING(255), allowNull: false },
      about_us: { type: Sequelize.STRING(255), allowNull: false },
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
      modelName: "Restaurant",
      tableName: "restaurants",
    }
  );

  // Hook to auto-generate unique codes
  Restaurant.beforeCreate(async (restaurant, options) => {
    const transaction = options.transaction;

    // dynamically import the ESM helper
    const { generateUniqueValue, generateAppCode, generateApiKey } =
      await getCodeHelpers();

    if (!restaurant.restaurant_code) {
      restaurant.restaurant_code = await generateUniqueValue({
        model: Restaurant,
        field: "restaurant_code",
        generateFn: () => generateAppCode("REST"),
        maxRetries: 10,
        transaction,
      });
    }

    if (!restaurant.api_key) {
      restaurant.api_key = await generateUniqueValue({
        model: Restaurant,
        field: "api_key",
        generateFn: generateApiKey,
        maxRetries: 10,
        transaction,
      });
    }
  });

  return Restaurant;
};
