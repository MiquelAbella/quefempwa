const bcrypt = require("bcryptjs");
const User = require("../models/User");

const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res) => {
  const { remail, rpassword1, rpassword2, rphone, token } = req.body;
  console.log(req.body);
  // if (rpassword1 !== rpassword2) {
  //   return res.json({
  //     ok: false,
  //     msg: "Las contraseñas deben coincidir",
  //   });
  // }

  // try {
  //   let user = await User.findOne({ email: remail });

  //   if (user) {
  //     return res.json({
  //       ok: false,
  //       msg: "El usuario ya existe",
  //     });
  //   } else {
  //     user = new User(req.body);
  //   }

  //   const uid = uuidv4();

  //   let salt = bcrypt.genSaltSync(10);
  //   let hashedPassword = bcrypt.hashSync(rpassword1, salt);

  //   user.email = remail;
  //   user.password = hashedPassword;
  //   user.uid = uid;
  //   user.phone = rphone;
  //   user.expoToken = token;
  //   user.elderName = rname
  //   user.schedule = {};
  //   user.areNotificationsActive = true

  //   await user.save();

  //   user.password = undefined;

  //   res.json({
  //     ok: true,
  //     user,
  //   });
  // } catch (error) {
  //   res.json({ msg: error.message });
  // }
};

const loginUser = async (req, res) => {
  const { lemail, lpassword } = req.body;

  try {
    let user = await User.findOne({ email: lemail });

    if (!user) {
      return res.json({ ok: false, msg: "No hem trobat l'usuari" });
    }

    const validPassword = await bcrypt.compare(lpassword, user.password);
    user.password = undefined;

    if (!validPassword) {
      return res.json({
        ok: false,
        msg: "Email o clau incorrectes",
      });
    }
    res.json({
      ok: true,
      user: user,
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
};
const setSchedule = async (req, res) => {
  const {
    uid,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = req.body;

  try {
    let user = await User.findOne({ uid });
    user.schedule = {
      sunday: sunday,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
    };

    await user.save();

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: "No hem pogut guardar, intenta-ho de nou en uns minuts",
    });
  }
};

const getSchedule = async (req, res) => {
  let { uid } = req.body;

  try {
    let user = await User.findOne({ uid });

    res.json({ ok: true, schedule: user.schedule });
  } catch (error) {
    res.json({ ok: false, msg: "Intenta-ho de nou en uns minuts" });
  }
};

const postInfo = async (req, res) => {
  const { uid, text, coords } = req.body;

  try {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let moment = today.toLocaleDateString("es");

    let user = await User.findOne({ uid });
    if (user.history) {
      user.history = [...user.history, [coords, text, moment]];
    } else {
      user.history = [[coords], text];
    }

    await user.save();

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    res.json({ ok: false });
  }
};

const postToken = async (req, res) => {
  const { uid, expoToken } = req.body;

  try {
    let user = await User.findOne({ uid });
    user.expoToken = expoToken;
    user.markModified("expoToken");
    console.log(user);
    await user.save();

    res.json({ ok: true, user: user });
  } catch (error) {
    res.json({ ok: false, msg: "Intenta-ho de nou en uns minuts" });
  }
};

const postLocation = async (req, res) => {
  const { uid, coords, timestamp } = req.body;

  try {
    let user = await User.findOne({ uid });

    user.lastKnownLocation = [coords, timestamp];

    await user.save();

    res.json({
      ok: true,
    });
  } catch (error) {
    res.json({ ok: false });
  }
};

const getUser = async (req, res) => {
  const { uid } = req.body;

  try {
    let user = await User.findOne({ uid });
    user.password = undefined;
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    res.json({ ok: false });
  }
};

const postSettings = async (req, res) => {
  console.log(req.body);
  const { uid, settingsValues } = req.body;
  const {
    elderName,
    phone,
    minimumDistance,
    position,
    areNotificationsActive,
  } = settingsValues;
  try {
    let user = await User.findOne({ uid });
    user.phone = phone;
    user.markModified("phone");
    user.minimumDistance = minimumDistance;
    user.markModified("minimumDistance");
    user.position = position;
    user.markModified("position");
    user.elderName = elderName;
    user.markModified("elderName");
    user.areNotificationsActive = areNotificationsActive;
    user.markModified("areNotificationsActive");
    console.log(user.areNotificationsActive);
    await user.save();
    user.password = undefined;
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    res.json({ ok: false });
  }
};

module.exports = {
  postToken,
  createUser,
  loginUser,
  setSchedule,
  getSchedule,
  postInfo,
  postLocation,
  getUser,
  postSettings,
};
