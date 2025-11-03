"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      mobile: { type: Sequelize.STRING, allowNull: false },
      country_code: { type: Sequelize.STRING, allowNull: false },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      otp: { type: Sequelize.STRING, allowNull: false },
      phoneVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    await queryInterface.addConstraint("users", {
      fields: ["restaurant_id", "mobile"],
      type: "unique",
      name: "users_restaurant_id_mobile_unique",
    });
  },
  async down(queryInterface) {
    await queryInterface
      .removeConstraint("users", "users_restaurant_id_mobile_unique")
      .catch(() => {});
    await queryInterface.dropTable("users");
  },
};
