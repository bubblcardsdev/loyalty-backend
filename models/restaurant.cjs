"use strict";
const { Model } = require("sequelize");

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
      Restaurant.hasMany(models.Point, { foreignKey: "restaurant_id" });
      Restaurant.hasMany(models.UserPointHistory, { foreignKey: "restaurant_id" });
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
      app_name: { type: Sequelize.STRING(100) },
      logo_key: { type: Sequelize.STRING(255) },
      primary_color: { type: Sequelize.STRING(20) },
      secondary_color: { type: Sequelize.STRING(20) },
      domain: { type: Sequelize.STRING(255) },
      terms_conditions: { type: Sequelize.STRING(255), allowNull: false },
      privacy_policy: { type: Sequelize.STRING(255), allowNull: false },
      about_us: { type: Sequelize.STRING(255), allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "Restaurant",
      tableName: "restaurants"
    }
  );

  return Restaurant;
};
