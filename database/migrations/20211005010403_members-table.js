exports.up = function (knex) {
  return knex.schema.createTable("members", (tbl) => {
    tbl.increments("id");
    tbl.string("first_name", 128).notNull();
    tbl.string("last_name", 128).notNull();
    tbl.string("dob", 12).notNull();
    tbl.string("country", 2).notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("members");
};
