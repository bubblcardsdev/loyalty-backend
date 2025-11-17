"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class UserTier extends Model {
    static associate(models) {
      UserTier.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
      UserTier.belongsTo(models.User, { foreignKey: "user_id" });
      UserTier.belongsTo(models.Tier, { foreignKey: "tier_id" });
    }
  }

  UserTier.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      tier_id: { type: Sequelize.INTEGER, allowNull: false },
      start_at: { type: Sequelize.DATE, allowNull: false },
      expire_at: { type: Sequelize.DATE, allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "UserTier",
      tableName: "user_tiers"
    }
  );

  return UserTier;
};
