"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Menu extends Model {
    static associate(models) {
      Menu.belongsTo(models.Restaurant, {
        foreignKey: "restaurant_id",
        as: "restaurant",
      });
      Menu.belongsTo(models.MenuCategory, {
        foreignKey: "menu_category_id",
        as: "category",
      });
    }
  }

  Menu.init(
    {
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      menu_category_id: { type: Sequelize.INTEGER, allowNull: false },
      img_key: { type: Sequelize.STRING, allowNull: false },
      selling_price: { type: Sequelize.INTEGER, allowNull: false },
      cost_price: { type: Sequelize.INTEGER, allowNull: false },
      veg: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Menu",
      tableName: "menu",
      indexes: [
        {
          unique: true,
          fields: ["restaurant_id", "name"],
          name: "menu_restaurant_id_name_unique",
        },
      ],
    }
  );

  return Menu;
};
