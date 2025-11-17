"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class RedeemedOffer extends Model {
    static associate(models) {
      RedeemedOffer.belongsTo(models.Offer, { foreignKey: "offer_id" });
      RedeemedOffer.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
      RedeemedOffer.belongsTo(models.User, { foreignKey: "user_id" });
      RedeemedOffer.hasMany(models.UserPointHistory, { foreignKey: "redeem_id" });
    }
  }

  RedeemedOffer.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      offer_id: { type: Sequelize.INTEGER, allowNull: false },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      expired: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      expiredAt: { type: Sequelize.DATE },
      redeemed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      redeemed_At: { type: Sequelize.DATE },
      is_active: { type: Sequelize.BOOLEAN },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "RedeemedOffer",
      tableName: "redeemed_offers"
    }
  );

  return RedeemedOffer;
};
