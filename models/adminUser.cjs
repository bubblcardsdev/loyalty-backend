"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class AdminUser extends Model {
    static associate(models) {
      AdminUser.belongsTo(models.Restaurant, {
        foreignKey: "restaurant_id",
        as: "restaurant",
      });
    }
  }

  AdminUser.init(
    {
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "AdminUser",
      tableName: "admin_users",
    }
  );

  return AdminUser;
};
