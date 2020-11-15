const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalsSchema = new Schema({
  complete: {
    type: Boolean,
    required: true,
},
  sport: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  }
});

const Goals = mongoose.model('Goals', GoalsSchema);

module.exports = Goals;
