const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());

const Workouts = require("../models/workoutModel");

router.get("/", (req, res, next) => {
  Workouts.find({})
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  Workouts.create({
    complete: req.body.complete,
    sport: req.body.sport,
    time: req.body.time,
    distance: req.body.distance,
    pace: req.body.pace,
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


router.delete("/:id", (req, res) => {
  Workouts.deleteOne({ _id: req.params.id }, (err, workouts) => {
    if (err) console.log(err);

    Workouts.find((err, workouts) => {
      if (err) console.log(handleError(err));
      res.json(workouts);
    });
  });
});

router.put("/:id", async (req, res) => {
  await Workouts.updateOne({_id: req.params.id}, req.body);
  // Workouts.findByIdAndUpdate(req.params.id, { new: true }, (err, workouts) => {
  //   workouts.complete = !workouts.complete;

  //   Workouts.updateOne(req.query, (err, workouts) => {
  //     console.log(workouts);

  //     if (err) {
  //       console.log(err);
  //     }

  //     Workouts.find((err, workouts) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       res.json(workouts);
  //     });
  //   });
  // });
});

module.exports = router;
