const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    schedule: {
      type: Object,
    },
    phone: { type: String, required: true },
    history: {
      type: Array,
    },
    expoToken: {
      type: String,
    },
    lastKnownLocation: {
      type: Array,
    },
    elderName: {
      type: String,
    },
    position: {
      type: Array,
    },
    minimumDistance: {
      type: Number,
    },
    areNotificationsActive: {
      type: Boolean,
    },
  },
  { minimize: false }
);

module.exports = model("User", UserSchema);
