const { Router } = require("express");

const {
  createUser,
  loginUser,
  setSchedule,
  getSchedule,
  postInfo,
} = require("../controllers/auth");

const router = Router();

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);

router.post("/getSchedule", getSchedule);

router.post("/setSchedule", setSchedule);
router.post("/postInfo", postInfo);

module.exports = router;
