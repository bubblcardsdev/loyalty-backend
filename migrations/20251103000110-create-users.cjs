"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, BOOLEAN, DATE } = Sequelize;

    await queryInterface.createTable("users", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      cardCode: { type: STRING, unique: true },
      name: { type: STRING, allowNull: false },
      email: { type: STRING, allowNull: false },
      mobile: { type: STRING, allowNull: false },
      dob: { type: DATE, allowNull: true },
      country_code: { type: STRING, allowNull: false },
      restaurant_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "restaurants", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      img_key: { type: STRING },
      reference_code: { type: STRING, allowNull: false, unique: true },
      phoneVerified: { type: BOOLEAN, allowNull: false, defaultValue: false },
      is_active: { type: BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });

    await queryInterface.addIndex("users", ["restaurant_id", "mobile"], {
      unique: true,
      name: "users_restaurant_mobile_unique",
    });

    await queryInterface.addIndex("users", ["restaurant_id", "email"], {
      name: "users_restaurant_email_index",
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
