"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, BOOLEAN, DATE } = Sequelize;

    await queryInterface.createTable("user_otps", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      otp: { type: STRING, allowNull: false },
      expires_at: { type: DATE, allowNull: false },
      is_used: { type: BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") },
      updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal("NOW()") }
    });

    await queryInterface.addIndex("user_otps", ["user_id"], {
      name: "user_otps_user_id_index"
    });

    await queryInterface.addIndex("user_otps", ["user_id", "is_used", "expires_at"], {
      name: "user_otps_user_used_expires_index"
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user_otps");
  }
};
