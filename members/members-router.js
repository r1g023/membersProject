const router = require("express").Router();
const Members = require("../members/members-helpers");
const {
  getById,
  validateMemberPost,
} = require("../members/members-middleware");

//GET /api/members
router.get("/", (req, res, next) => {
  Members.get()
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

//GET /api/member_id
router.get("/:id", getById(), (req, res, next) => {
  res.json(req.user);
});

//POST /api/members
router.post("/", validateMemberPost(), (req, res, next) => {
  const credentials = req.body;
  Members.postMember(credentials)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => next(err));
});

module.exports = router;
