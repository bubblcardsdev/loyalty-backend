"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Restaurant extends Model {
    static associate(models) {
      Restaurant.hasMany(models.AdminUser, {
        foreignKey: "restaurant_id",
        as: "admins",
      });
      Restaurant.hasMany(models.User, {
        foreignKey: "restaurant_id",
        as: "users",
      });
      Restaurant.hasMany(models.Menu, {
        foreignKey: "restaurant_id",
        as: "menus",
      });
      Restaurant.hasMany(models.Outlet, {
        foreignKey: "restaurant_id",
        as: "outlets",
      });
    }
  }

  Restaurant.init(
    {
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      restaurant_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      api_key: { type: Sequelize.STRING, allowNull: false, unique: true },
      terms_conditions: { type: Sequelize.STRING, allowNull: false },
      privacy_policy: { type: Sequelize.STRING, allowNull: false },
      about_us: { type: Sequelize.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Restaurant",
      tableName: "restaurants",
    }
  );

  return Restaurant;
};
