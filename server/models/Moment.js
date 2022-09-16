const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `SavedMoments` array in User.js
const momentSchema = new Schema({
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
});

module.exports = momentSchema;
