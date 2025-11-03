"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Outlet extends Model {
    static associate(models) {
      Outlet.belongsTo(models.Restaurant, {
        foreignKey: "restaurant_id",
        as: "restaurant",
      });
    }
  }

  Outlet.init(
    {
      branch_name: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      address: { type: Sequelize.STRING, allowNull: false },
      city: { type: Sequelize.STRING, allowNull: false },
      state: { type: Sequelize.STRING, allowNull: false },
      country: { type: Sequelize.STRING, allowNull: false },
      manager: { type: Sequelize.STRING, allowNull: false },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Outlet",
      tableName: "outlets",
      indexes: [
        {
          unique: true,
          fields: ["restaurant_id", "branch_name"],
          name: "outlets_restaurant_id_branch_name_unique",
        },
      ],
    }
  );

  return Outlet;
};
