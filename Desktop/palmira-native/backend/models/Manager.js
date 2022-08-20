const { Schema, model } = require("mongoose");

const ManagerSchema = Schema(
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
    elderUid: { type: String, required: true },

    uid: {
      type: String,
      required: true,
    },
    schedule: {
      type: Object,
    },
    history: {
      type: Array,
    },
  },
  { minimize: false }
);

module.exports = model("Manager", ManagerSchema);
