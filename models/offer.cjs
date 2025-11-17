"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Offer extends Model {
    static associate(models) {
      Offer.belongsTo(models.Campaign, { foreignKey: "campaign_id" });
      Offer.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
      Offer.belongsTo(models.OfferType, { foreignKey: "offer_type_id" });

      Offer.belongsTo(models.MenuCategory, {
        foreignKey: "offerItem",
        as: "offerItemCategory"
      });

      Offer.belongsTo(models.MenuCategory, {
        foreignKey: "freeItem",
        as: "freeItemCategory"
      });

      Offer.hasMany(models.RedeemedOffer, { foreignKey: "offer_id" });
      Offer.hasMany(models.Activity, { foreignKey: "offer_id" });
    }
  }

  Offer.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT },
      campaign_id: { type: Sequelize.INTEGER, allowNull: false },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      points_required: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      offer_type_id: { type: Sequelize.INTEGER, allowNull: false },
      min_value: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      max_value: { type: Sequelize.DECIMAL(10, 2) },
      offerValue: { type: Sequelize.DECIMAL(10, 2) },
      offerItem: { type: Sequelize.INTEGER },
      freeItem: { type: Sequelize.INTEGER },
      free_quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      max_uses: { type: Sequelize.INTEGER },
      new_users: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      validity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 7 },
      expire_at: { type: Sequelize.DATE, allowNull: false },
      points_earnable: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "Offer",
      tableName: "offers"
    }
  );

  return Offer;
};
