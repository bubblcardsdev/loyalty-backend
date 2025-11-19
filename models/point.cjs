"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Point extends Model {
    static associate(models) {
      Point.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
      Point.hasMany(models.UserPointHistory, { foreignKey: "point_id" });
    }
  }

  Point.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      value: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      minSpend: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      maxPoints: { type: Sequelize.INTEGER },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false, unique: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "Point",
      tableName: "points"
    }
  );

  return Point;
};
