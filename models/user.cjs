"use strict";
const { Model } = require("sequelize");

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
      email: { type: Sequelize.STRING, allowNull: false },
      mobile: { type: Sequelize.STRING, allowNull: false },
      country_code: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      img_key: { type: Sequelize.STRING },
      phoneVerified: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users"
    }
  );

  return User;
};
