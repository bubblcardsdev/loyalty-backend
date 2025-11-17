"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, BOOLEAN, DATE, DECIMAL, TEXT } = Sequelize;

    await queryInterface.createTable("menu", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      description: { type: STRING, allowNull: false },
      restaurant_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      menu_category_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "menu_categories", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      img_key: { type: STRING, allowNull: false },
      price: { type: DECIMAL(10, 2), allowNull: false },
      veg: { type: BOOLEAN, allowNull: false, defaultValue: false },
      is_active: { type: BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });

    await queryInterface.addIndex(
      "menu",
      ["restaurant_id", "name", "menu_category_id"],
      {
        unique: true,
        name: "menu_restaurant_name_category_unique"
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("menu");
  }
};
