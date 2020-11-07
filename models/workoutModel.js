const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkoutsSchema = new Schema({
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
    }
})

const Workouts = mongoose.model('Workouts', WorkoutsSchema)

module.exports = Workouts