const Members = require("../members/members-helpers");

module.exports = {
  getById,
  validateMemberPost,
};

function getById() {
  return (req, res, next) => {
    Members.getById(req.params.id)
      .then((user) => {
        user
          ? ((req.user = user), next())
          : res.json({ message: `cant find user of id # ${req.params.id}` });
      })
      .catch((err) => next(err));
  };
}

//POST /api/members
function validateMemberPost() {
  return async (req, res, next) => {
    const { first_name, last_name, dob, country } = req.body;

    !first_name
      ? await res.json({ message: "error, check your 'first_name' property" })
      : !last_name
      ? await res.json({ message: "error, check your 'last_name' property" })
      : !dob
      ? await res.json({ message: "error, check your 'dob' property" })
      : !country
      ? await res.json({ message: "error, check your 'country' property" })
      : null;
    next();
  };
}
