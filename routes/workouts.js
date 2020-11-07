const express = require("express");
const router = express.Router();
// const cors = require('cors')

// router.use(cors()); 

const Workouts = require("../models/workoutModel");

router.post('/', (req, res) => {
  Workouts.create({
    sport: req.body.sport,
    time: req.body.time,
    distance: req.body.distance,
  })
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.json(err);

      Workouts.find((err, workouts) => {
        if (err) console.log(handleError(err));
        res.json(workouts);
      });
    });
});

router.get('/', (req, res, next) => {
    Workouts.find({})
    .then((workouts) => {
        res.json(workouts)
    })
    .catch((err) => {
        res.json(err)
    })
})

module.exports = router