"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, BOOLEAN } = Sequelize;

    await queryInterface.createTable("user_tiers", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
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
      tier_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "tiers", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      start_at: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()")
      },
      expire_at: { type: DATE, allowNull: false },
      is_active: { type: BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });

    await queryInterface.addIndex(
      "user_tiers",
      ["restaurant_id", "user_id", "is_active"],
      {
        name: "user_tiers_restaurant_user_active_index"
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user_tiers");
  }
};
