const { Router } = require("express");
const isAuthed = require("../middlewares/is-auth");
const { put, post, get, remove } = require("../controllers/order.controller");

const router = Router();

router.get("/", isAuthed, get),
  router.post("/", isAuthed, post),
  router.put("/:id", isAuthed, put),
  router.delete("/:id", isAuthed, remove);

module.exports = router;
