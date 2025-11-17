"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class UserOtp extends Model {
    static associate(models) {
      UserOtp.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }

  UserOtp.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      otp: { type: Sequelize.STRING, allowNull: false },
      expires_at: { type: Sequelize.DATE, allowNull: false },
      is_used: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "UserOtp",
      tableName: "user_otps"
    }
  );

  return UserOtp;
};
