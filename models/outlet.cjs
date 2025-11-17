"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Outlet extends Model {
    static associate(models) {
      Outlet.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
    }
  }

  Outlet.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      branch_name: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      img_key: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING, allowNull: false },
      city: { type: Sequelize.STRING, allowNull: false },
      state: { type: Sequelize.STRING, allowNull: false },
      country: { type: Sequelize.STRING, allowNull: false },
      manager: { type: Sequelize.STRING, allowNull: false },
      contact: { type: Sequelize.STRING, allowNull: false },
      latitude: { type: Sequelize.DECIMAL(9, 6) },
      longitude: { type: Sequelize.DECIMAL(9, 6) },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "Outlet",
      tableName: "outlets"
    }
  );

  return Outlet;
};
