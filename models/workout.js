var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: new Date().setDate(new Date().getDate()),
  },
  exercises: [
    {
      type: {
        type: String,
      },

      name: {
        type: String,
      },

      duration: {
        type: Number,
      },

      weight: {
        type: Number,
      },

      reps: {
        type: Number,
      },

      sets: {
        type: Number,
      },

      distance: {
        type: Number,
      },
    },
  ],
});

var Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
