"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, BOOLEAN, DATE } = Sequelize;

    await queryInterface.createTable("restaurants", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false, unique: true },
      mobile: { type: STRING, allowNull: false, unique: true },
      email: { type: STRING, allowNull: false, unique: true },
      restaurant_code: { type: STRING, allowNull: false, unique: true },
      api_key: { type: STRING, allowNull: false, unique: true },
      app_name: { type: STRING(100), allowNull: false, unique: true },
      logo_key: { type: STRING(255), allowNull: false, unique: true },
      background_theme: { type: STRING(100), allowNull: false, defaultValue: "#FF9900" },
      terms_conditions: { type: STRING(255), allowNull: false },
      privacy_policy: { type: STRING(255), allowNull: false },
      about_us: { type: STRING(255), allowNull: false },
      is_active: { type: BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("restaurants");
  },
};
