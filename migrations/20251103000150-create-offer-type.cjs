"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;

    await queryInterface.createTable("offer_type", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(50), allowNull: false, unique: true },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("offer_type");
  }
};
