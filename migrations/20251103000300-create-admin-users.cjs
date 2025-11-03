"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("admin_users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      password: { type: Sequelize.STRING, allowNull: false },
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
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["email", "restaurant_id"],
        },
      ],
    }
);
  },
  async down(queryInterface) {
    await queryInterface.dropTable("admin_users");
  },
};
