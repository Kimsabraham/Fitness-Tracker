const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

/// Html routes

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

/// API routes

app.get("/api/workout", (req, res) => {
  db.Workout.find({}).then((data) => {
    res.json(data);
  });
});

app.put("/api/workout/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(req.params.id, { exercises: req.body }).then(
    (data) => {
      res.json(data);
    }
  );
});

app.post("/api/workout", (req, res) => {
  db.Workout.create({}).then((data) => {
    res.json(data);
  });
});

app.get("/api/workout/range", (req, res) => {
  db.Workout.find({})
    .sort({ day: -1 })
    .limit(10)
    .then((data) => {
      res.json(data);
    });
});

.catch((err) => res.json(err));



app.listen(PORT, () => {
  console.log(`Were listening ${PORT}!`);
});