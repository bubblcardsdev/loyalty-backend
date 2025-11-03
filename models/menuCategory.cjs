"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class MenuCategory extends Model {
    static associate(models) {
      MenuCategory.hasMany(models.Menu, {
        foreignKey: "menu_category_id",
        as: "menus",
      });
    }
  }

  MenuCategory.init(
    {
      name: { type: Sequelize.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "MenuCategory",
      tableName: "menu_categories",
    }
  );

  return MenuCategory;
};
