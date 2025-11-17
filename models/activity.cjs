"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Activity extends Model {
    static associate(models) {
      Activity.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
      Activity.belongsTo(models.ActivityType, { foreignKey: "activity_type_id" });
      Activity.belongsTo(models.User, { foreignKey: "user_id" });
      Activity.belongsTo(models.Offer, { foreignKey: "offer_id" });
    }
  }

  Activity.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      activity: { type: Sequelize.STRING(1000), allowNull: false },
      activity_type_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER },
      offer_id: { type: Sequelize.INTEGER },
      metadata: { type: Sequelize.JSON },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "Activity",
      tableName: "activity"
    }
  );

  return Activity;
};
