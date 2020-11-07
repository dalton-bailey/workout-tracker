const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;

const workoutRoutes = require("./routes/workouts");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/workouts", workoutRoutes);
app.use(express.static("src"));

mongoose.connect(
  "mongodb+srv://admin_user:HxkSk4DjUsf2pfUv@cluster0.wfrgb.mongodb.net/skis?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.listen(port, () => {
  console.log("server running on port 3000");
});
