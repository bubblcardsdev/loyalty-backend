"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;

    await queryInterface.createTable("menu_categories", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      restaurant_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      name: { type: STRING, allowNull: false },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });

    await queryInterface.addIndex(
      "menu_categories",
      ["restaurant_id", "name"],
      {
        unique: true,
        name: "menu_categories_restaurant_name_unique"
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("menu_categories");
  }
};
