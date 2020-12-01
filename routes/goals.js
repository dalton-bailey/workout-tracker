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

// router.put("/:id", (req, res) => {
//   Goals.findByIdAndUpdate(req.params.id, { new: true }, (err, goals) => {
//     goals.complete = !goals.complete;

//     Goals.updateOne(req.query, (err, goals) => {
//       console.log(goals);

//       if (err) {
//         console.log(err);
//       }

//       Goals.find((err, goals) => {
//         if (err) {
//           console.log(err);
//         }
//         res.json(goals);
//       });
//     });
//   });
// });

module.exports = router;
