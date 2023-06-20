const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendSchema = new Schema({
  userId: {
    // type: Schema.Types.ObjectId,
    type: String,
    ref: "User",
    required: true,
  },
  eventId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "Event",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attend", attendSchema);
