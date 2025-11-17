"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;

    await queryInterface.createTable("activity_type", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("activity_type");
  }
};
