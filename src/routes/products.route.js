const { Router } = require("express");
const isAdmin = require("../middlewares/is-admin");
const isAuthed = require("../middlewares/is-auth");
const {
  put,
  post,
  get,
  remove,
} = require("../controllers/products.controller");


const router = Router();

router.get("/", isAuthed, get),
  router.post("/", isAdmin, post),
  router.put("/:id", isAdmin, put),
  router.delete("/:id", isAdmin, remove);

module.exports = router;
