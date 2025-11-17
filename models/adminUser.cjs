"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class AdminUser extends Model {
    static associate(models) {
      AdminUser.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
    }
  }

  AdminUser.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      password_hash: { type: Sequelize.STRING(255), allowNull: false },
      role: { type: Sequelize.STRING(50), allowNull: false, defaultValue: "OWNER" },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "AdminUser",
      tableName: "admin_users"
    }
  );

  return AdminUser;
};
