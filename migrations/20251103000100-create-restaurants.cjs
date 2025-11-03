"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("restaurants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      restaurant_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      api_key: { type: Sequelize.STRING, allowNull: false, unique: true },
      terms_conditions: { type: Sequelize.STRING, allowNull: false },
      privacy_policy: { type: Sequelize.STRING, allowNull: false },
      about_us: { type: Sequelize.STRING, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("restaurants");
  },
};
