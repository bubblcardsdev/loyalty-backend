"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, BOOLEAN, DECIMAL, TEXT } = Sequelize;

    await queryInterface.createTable("offers", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: STRING(255), allowNull: false },
      description: { type: TEXT },
      campaign_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "campaigns", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      restaurant_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      points_required: { type: INTEGER, allowNull: false, defaultValue: 0 },
      offer_type_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "offer_type", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      },
      min_value: { type: DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      max_value: { type: DECIMAL(10, 2) },
      offerValue: { type: DECIMAL(10, 2) },
      offerItem: {
        type: INTEGER,
        references: { model: "menu_categories", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      freeItem: {
        type: INTEGER,
        references: { model: "menu_categories", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      free_quantity: { type: INTEGER, allowNull: false, defaultValue: 0 },
      max_uses: { type: INTEGER },
      new_users: { type: BOOLEAN, allowNull: false, defaultValue: false },
      validity: { type: INTEGER, allowNull: false, defaultValue: 7 },
      expire_at: { type: DATE, allowNull: false },
      points_earnable: { type: BOOLEAN, allowNull: false, defaultValue: false },
      is_active: { type: BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });

    await queryInterface.addIndex(
      "offers",
      ["restaurant_id", "is_active", "expire_at"],
      {
        name: "offers_restaurant_active_expire_index"
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("offers");
  }
};
