"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;

    await queryInterface.createTable("activity", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      restaurant_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      activity: { type: STRING(1000), allowNull: false },
      activity_type_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "activity_type", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      },
      user_id: {
        type: INTEGER,
        references: { model: "users", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      offer_id: {
        type: INTEGER,
        references: { model: "offers", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      metadata: { type: Sequelize.JSON },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });

    await queryInterface.addIndex("activity", ["restaurant_id", "createdAt"], {
      name: "activity_restaurant_created_index"
    });

    await queryInterface.addIndex("activity", ["user_id", "createdAt"], {
      name: "activity_user_created_index"
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("activity");
  }
};
