"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("menu", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      menu_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "menu_categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      img_key: { type: Sequelize.STRING, allowNull: false },
      selling_price: { type: Sequelize.INTEGER, allowNull: false },
      cost_price: { type: Sequelize.INTEGER, allowNull: false },
      veg: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
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

    await queryInterface.addConstraint("menu", {
      fields: ["restaurant_id", "name"],
      type: "unique",
      name: "menu_restaurant_id_name_unique",
    });
  },
  async down(queryInterface) {
    await queryInterface
      .removeConstraint("menu", "menu_restaurant_id_name_unique")
      .catch(() => {});
    await queryInterface.dropTable("menu");
  },
};
