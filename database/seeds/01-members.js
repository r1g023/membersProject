const faker = require("faker");

exports.seed = function (knex) {
  return knex("members").insert([
    {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      dob: "01/23/1871",
      country: "MX",
    },
  ]);
};
