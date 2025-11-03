"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("outlets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      branch_name: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      address: { type: Sequelize.STRING, allowNull: false },
      city: { type: Sequelize.STRING, allowNull: false },
      state: { type: Sequelize.STRING, allowNull: false },
      country: { type: Sequelize.STRING, allowNull: false },
      manager: { type: Sequelize.STRING, allowNull: false },
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

    await queryInterface.addConstraint("outlets", {
      fields: ["restaurant_id", "branch_name"],
      type: "unique",
      name: "outlets_restaurant_id_branch_name_unique",
    });
  },
  async down(queryInterface) {
    await queryInterface
      .removeConstraint("outlets", "outlets_restaurant_id_branch_name_unique")
      .catch(() => {});
    await queryInterface.dropTable("outlets");
  },
};
