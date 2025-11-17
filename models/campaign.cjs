"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Campaign extends Model {
    static associate(models) {
      Campaign.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
      Campaign.hasMany(models.Offer, { foreignKey: "campaign_id" });
    }
  }

  Campaign.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "Campaign",
      tableName: "campaigns"
    }
  );

  return Campaign;
};
