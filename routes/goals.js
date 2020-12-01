const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());

const Goals = require("../models/goalsModel");

router.get("/", (req, res, next) => {
  Goals.find({})
    .then((goals) => {
      res.json(goals);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  Goals.create({
    complete: req.body.complete,
    sport: req.body.sport,
    distance: req.body.distance,
  })
    .then((goals) => {
      res.json(goals);
    })
    .catch((err) => {
      res.json(err);

      Goals.find((err, goals) => {
        if (err) console.log(handleError(err));
        res.json(goals);
      });
    });
});


router.delete("/:id", (req, res) => {
  Goals.deleteOne({ _id: req.params.id }, (err, goals) => {
    if (err) console.log(err);

    Goals.find((err, goals) => {
      if (err) console.log(handleError(err));
      res.json(goals);
    });
  });
});

router.put("/:id", async (req, res) => {
  await Goals.updateOne({_id: req.params.id}, req.body);

});

module.exports = router;
