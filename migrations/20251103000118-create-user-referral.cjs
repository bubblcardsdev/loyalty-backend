"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE } = Sequelize;

    await queryInterface.createTable("user_referral", {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      user_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      referred_by_id: {
        type: INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL" // prevents cascading delete on parent
      },

      createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()")
      },

      updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()")
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user_referral");
  }
};
