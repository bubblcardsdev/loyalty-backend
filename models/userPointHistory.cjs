"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class UserPointHistory extends Model {
    static associate(models) {
      UserPointHistory.belongsTo(models.Point, { foreignKey: "point_id" });
      UserPointHistory.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
      UserPointHistory.belongsTo(models.User, { foreignKey: "user_id" });
      UserPointHistory.belongsTo(models.RedeemedOffer, { foreignKey: "redeem_id" });
    }
  }

  UserPointHistory.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      points: { type: Sequelize.INTEGER, allowNull: false },
      point_id: { type: Sequelize.INTEGER, allowNull: false },
      restaurant_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      redeem_id: { type: Sequelize.INTEGER },
      billImg: { type: Sequelize.STRING(255) },
      spentAmount: { type: Sequelize.DECIMAL(10, 2) },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    },
    {
      sequelize,
      modelName: "UserPointHistory",
      tableName: "user_point_history"
    }
  );

  return UserPointHistory;
};
