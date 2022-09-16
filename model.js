const mongoose = require("mongoose");
const { Schema } = mongoose;

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

// const MenuSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
// });

// const RestaurantSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   menu: {
//     type: [MenuSchema],
//   },
// });

const Moment = mongoose.model("Moment", momentSchema);
const Moments = mongoose.model("Moment", momentsSchema);

module.exports = {
  Moment,
  Moments,
};
