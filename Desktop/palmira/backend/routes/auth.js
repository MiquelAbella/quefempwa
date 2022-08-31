const { Router } = require("express");

const {
  createUser,
  loginUser,
  setSchedule,
  getSchedule,
  postInfo,
  postToken,
  postLocation,
  getUser,
  postSettings,
} = require("../controllers/auth");

const router = Router();

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.post("/getUser", getUser);

router.post("/getSchedule", getSchedule);

router.post("/setSchedule", setSchedule);
router.post("/postInfo", postInfo);
router.post("/postToken", postToken);
router.post("/postLocation", postLocation);

router.post("/postSettings", postSettings);

module.exports = router;
