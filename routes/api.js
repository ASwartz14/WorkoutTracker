const db = require("../models");
const mongoose = require("mongoose");
const Workout = require("../models/workout");
const path = require("path");

module.exports = (app) => {
  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  app.put("/api/workouts/:id", (req, res) => {
    let id = req.params.id;
    db.Workout.updateOne({ _id: id }, { $push: { exercises: req.body } })
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(7)
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
