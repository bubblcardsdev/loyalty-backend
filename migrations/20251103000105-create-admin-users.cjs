"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;

    await queryInterface.createTable("admin_users", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      cardcode: { type: STRING, unique: true },
      email: { type: STRING, allowNull: false },
      restaurant_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      password_hash: { type: STRING(255), allowNull: false },
      role: { type: STRING(50), allowNull: false, defaultValue: "OWNER" },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });

    await queryInterface.addIndex("admin_users", ["email", "restaurant_id"], {
      unique: true,
      name: "admin_user_email_restaurant_unique"
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("admin_users");
  }
};
