"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, DECIMAL } = Sequelize;

    await queryInterface.createTable("points", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      value: { type: INTEGER, allowNull: false, defaultValue: 1 },
      minSpend: { type: DECIMAL(10, 2), allowNull: false },
      maxPoints: { type: INTEGER },
      restaurant_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });

    await queryInterface.addIndex("points", ["restaurant_id"], {
      name: "points_restaurant_index"
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("points");
  }
};
