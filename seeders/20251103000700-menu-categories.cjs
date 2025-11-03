"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "menu_categories",
      [
        {
          name: "Starters",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Main Course",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Desserts",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Beverages",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Salads",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Soups",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sides",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Breakfast",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kids Menu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Specials",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { fields: ["name"], ignoreDuplicates: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("menu_categories", null, {});
  },
};
