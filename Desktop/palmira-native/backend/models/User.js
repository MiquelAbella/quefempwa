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
  },
  { minimize: false }
);

module.exports = model("User", UserSchema);
