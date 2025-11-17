"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, DECIMAL, STRING } = Sequelize;

    await queryInterface.createTable("user_point_history", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      points: { type: INTEGER, allowNull: false },
      point_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "points", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      restaurant_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      redeem_id: {
        type: INTEGER,
        references: { model: "redeemed_offers", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      billImg: { type: STRING(255) },
      spentAmount: { type: DECIMAL(10, 2) },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });

    await queryInterface.addIndex(
      "user_point_history",
      ["restaurant_id", "user_id", "createdAt"],
      {
        name: "user_point_history_restaurant_user_created_index"
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user_point_history");
  }
};
