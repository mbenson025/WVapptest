const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedEvents` array in User.js
const eventSchema = new Schema({
  location: [
    {
      type: String,
    },
  ],
  summary: {
    type: String,
    required: true,
  },
  eventId: {
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

module.exports = eventSchema;
