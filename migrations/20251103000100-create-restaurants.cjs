"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, BOOLEAN, DATE } = Sequelize;

    await queryInterface.createTable("restaurants", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false, unique: true },
      mobile: { type: STRING, allowNull: false },
      email: { type: STRING, allowNull: false },
      restaurant_code: { type: STRING, allowNull: false, unique: true },
      api_key: { type: STRING, allowNull: false, unique: true },
      app_name: { type: STRING(100) },
      logo_key: { type: STRING(255) },
      primary_color: { type: STRING(20) },
      secondary_color: { type: STRING(20) },
      domain: { type: STRING(255) },
      terms_conditions: { type: STRING(255), allowNull: false },
      privacy_policy: { type: STRING(255), allowNull: false },
      about_us: { type: STRING(255), allowNull: false },
      is_active: { type: BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("restaurants");
  }
};
