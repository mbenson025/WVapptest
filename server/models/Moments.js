const { Schema } = require("mongoose");

const momentsSchema = new Schema({
  location: [
    {
      type: String,
    },
  ],
  laittude: [
    {
      type: Number,
    },
  ],
  longitude: [
    {
      type: Number,
    },
  ],

  summary: {
    type: String,
    required: true,
  },
  momentId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  link: {
    type: String,
  },
  header: {
    type: String,
    required: true,
  },
  // saved id
  eventId: {
    type: String,
    required: true,
  },
});

module.exports = momentsSchema;
