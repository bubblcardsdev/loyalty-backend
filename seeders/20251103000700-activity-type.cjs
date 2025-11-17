"use strict";

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "activity_type",
      [
        {
          name: "Referral",
        },
        {
          name: "Promotional",
        },
        {
          name: "Milestone",
        },
        {
          name: "Redeemable",
        },
        {
          name: "New user",
        },
        {
          name: "Feedback",
        },
        {
          name: "Points Adjustment",
        },
        {
          name: "Support",
        },
      ],
      {
        fields: ["name"],
        ignoreDuplicates: true,
      }
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("activity_type", null, {});
  },
};
