"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Menu extends Model {
    static associate(models) {
      Menu.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
      Menu.belongsTo(models.MenuCategory, { foreignKey: "menu_category_id" });
    }
  }

  Menu.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      menu_category_id: { type: Sequelize.INTEGER, allowNull: false },
      img_key: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      veg: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "Menu",
      tableName: "menu"
    }
  );

  return Menu;
};
