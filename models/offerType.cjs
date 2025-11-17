"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class OfferType extends Model {
    static associate(models) {
      OfferType.hasMany(models.Offer, { foreignKey: "offer_type_id" });
    }
  }

  OfferType.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(50), allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "OfferType",
      tableName: "offer_type"
    }
  );

  return OfferType;
};
