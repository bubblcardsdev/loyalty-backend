"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Tier extends Model {
    static associate(models) {
      Tier.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
      Tier.hasMany(models.UserTier, { foreignKey: "tier_id" });
    }
  }

  Tier.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      name: { type: Sequelize.STRING(60), allowNull: false },
      spentLimit: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      rewardPoints: { type: Sequelize.INTEGER, allowNull: false },
      multiplier: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 1
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "Tier",
      tableName: "tiers"
    }
  );

  return Tier;
};
