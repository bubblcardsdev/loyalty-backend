"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;

    await queryInterface.createTable("campaigns", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      restaurant_id: {
        type: INTEGER,
        allowNull: false,
        unique: true, // as per schema [not null,unique]
        references: { model: "restaurants", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      name: { type: STRING, allowNull: false },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("campaigns");
  }
};
