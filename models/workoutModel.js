const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
  complete: {
    type: Boolean,
    required: true,
},
  sport: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  pace: {
    type: Number,
    required: true,
  },
  ranking: {
    type: String
  }
});

const Workouts = mongoose.model('Workouts', WorkoutsSchema);

module.exports = Workouts;
