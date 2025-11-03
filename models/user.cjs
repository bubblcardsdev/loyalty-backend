"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Restaurant, {
        foreignKey: "restaurant_id",
        as: "restaurant",
      });
    }
  }

  User.init(
    {
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      mobile: { type: Sequelize.STRING, allowNull: false },
      country_code: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      otp: { type: Sequelize.STRING, allowNull: false },
      phoneVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      indexes: [
        {
          unique: true,
          fields: ["restaurant_id", "mobile"],
          name: "users_restaurant_id_mobile_unique",
        },
      ],
    }
  );

  return User;
};
