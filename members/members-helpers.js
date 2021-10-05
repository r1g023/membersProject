const db = require("../database/dbConfig");

module.exports = {
  get,
  getById,
  postMember,
};

function get() {
  return db("members").orderBy("id");
}

function getById(id) {
  return db("members").where({ id }).first();
}

async function postMember(user) {
  const [newUserObject] = await db("members").insert(user, [
    "id",
    "first_name",
    "last_name",
    "dob",
    "country",
  ]);
  return newUserObject;
}
