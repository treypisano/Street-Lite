const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    dates: 
    {
      type: String,
      required: true,
    },
    // startTime: {
    //   type: Date,
    //   required: true,
    // },
    // endTime: {
    //   type: Date,
    //   required: true,
    // },
    location: {
      startStreet: {
        type: String,
        required: true,
      },
      endStreet: {
        type: String,
        required: true,
      },
      mainStreet: {
        type: String,
        required: true,
      },
      latitude: {
        type: String,
        required: true,
      },
      longitude: {
        type: String,
        required: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
