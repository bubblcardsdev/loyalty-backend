"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, DECIMAL } = Sequelize;

    await queryInterface.createTable("tiers", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      restaurant_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      name: { type: STRING(60), allowNull: false },
      spentLimit: { type: DECIMAL(10, 2), allowNull: false },
      rewardPoints: { type: INTEGER, allowNull: false },
      multiplier: { type: DECIMAL(5, 2), allowNull: false, defaultValue: 1 },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });

    await queryInterface.addIndex("tiers", ["restaurant_id", "name"], {
      unique: true,
      name: "tiers_restaurant_name_unique"
    });

    await queryInterface.addIndex("tiers", ["restaurant_id", "spentLimit"], {
      unique: true,
      name: "tiers_restaurant_spentLimit_unique"
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("tiers");
  }
};
