"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class MenuCategory extends Model {
    static associate(models) {
      MenuCategory.belongsTo(models.Restaurant, {
        foreignKey: "restaurant_id"
      });

      MenuCategory.hasMany(models.Menu, {
        foreignKey: "menu_category_id",
        as: "menus"
      });

      MenuCategory.hasMany(models.Offer, {
        foreignKey: "offerItem",
        as: "offersAsOfferItem"
      });

      MenuCategory.hasMany(models.Offer, {
        foreignKey: "freeItem",
        as: "offersAsFreeItem"
      });
    }
  }

  MenuCategory.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false,references: { model: 'restaurants', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
      name: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "MenuCategory",
      tableName: "menu_categories"
    }
  );

  return MenuCategory;
};
