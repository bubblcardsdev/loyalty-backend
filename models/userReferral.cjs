"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class UserReferral extends Model {
    static associate(models) {
      // user who got referred
      UserReferral.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user"
      });

      // user who referred
      UserReferral.belongsTo(models.User, {
        foreignKey: "referred_by_id",
        as: "referredBy"
      });
    }
  }

  UserReferral.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      referred_by_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id"
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "UserReferral",
      tableName: "user_referral"
    }
  );

  return UserReferral;
};
