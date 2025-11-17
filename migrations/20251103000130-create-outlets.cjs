"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, BOOLEAN, DECIMAL } = Sequelize;

    await queryInterface.createTable("outlets", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      branch_name: { type: STRING, allowNull: false },
      restaurant_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      img_key: { type: STRING, allowNull: false },
      address: { type: STRING, allowNull: false },
      city: { type: STRING, allowNull: false },
      state: { type: STRING, allowNull: false },
      country: { type: STRING, allowNull: false },
      manager: { type: STRING, allowNull: false },
      contact: { type: STRING, allowNull: false },
      latitude: { type: DECIMAL(9, 6) },
      longitude: { type: DECIMAL(9, 6) },
      is_active: { type: BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });

    await queryInterface.addIndex("outlets", ["restaurant_id", "branch_name"], {
      unique: true,
      name: "outlets_restaurant_branch_unique"
    });

    await queryInterface.addIndex("outlets", ["restaurant_id"], {
      name: "outlets_restaurant_index"
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("outlets");
  }
};
