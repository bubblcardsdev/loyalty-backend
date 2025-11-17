"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class ActivityType extends Model {
    static associate(models) {
      ActivityType.hasMany(models.Activity, { foreignKey: "activity_type_id" });
    }
  }

  ActivityType.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "ActivityType",
      tableName: "activity_type"
    }
  );

  return ActivityType;
};
