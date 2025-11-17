"use strict";

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "offer_type",
      [
        {
          name: "Free Item",
        },
        {
          name: "Flat Discount",
        },
        {
          name: "Percent",
        },
      ],
      {
        fields: ["name"],
        ignoreDuplicates: true,
      }
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("offer_type", null, {});
  },
};
