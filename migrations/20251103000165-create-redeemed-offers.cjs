"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, BOOLEAN } = Sequelize;

    await queryInterface.createTable("redeemed_offers", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      offer_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "offers", key: "id" },
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
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      expired: { type: BOOLEAN, allowNull: false, defaultValue: false },
      expiredAt: { type: DATE },
      redeemed: { type: BOOLEAN, allowNull: false, defaultValue: false },
      redeemed_At: { type: DATE },
      is_active: { type: BOOLEAN },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });

    await queryInterface.addIndex(
      "redeemed_offers",
      ["restaurant_id", "user_id", "offer_id", "is_active"],
      {
        name: "redeemed_offers_restaurant_user_offer_active_index"
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("redeemed_offers");
  }
};
