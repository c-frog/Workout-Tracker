const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

router.post("/api/workouts", ({ body }, res)  => {
   Workout.create(body)
   .then(dbWorkout => {
      res.json(dbWorkout);
   })
   .catch(err => {
      res.status(400).json(err)
   });
});

router.put('/api/workouts/:id', (req, res) => {
   const {id: _id} = req.params;
   const {body} = req.body;

   const newWorkout = {
      _id,
      body
   };

   Workout.findByIdAndUpdate(
      _id, 
      newWorkout,
      (err, updatedWorkout) => {
         if (err) {
            res.json({
               newWorkout,
               success: false,
               msg: 'Failed to update Workout'
            }); 
         } else {
            res.json({newWorkout,
               success: true,
               msg: 'Workout added'
            });
         };
      });
   });

router.get("/api/workouts", (req, res) => {
   Workout.find({})
      .sort({ date: -1 })
      .then(dbWorkout => {
         res.json(dbWorkout)
      })
         .catch(err => {
            res.status(400).json(err);
         });
});

router.get("/api/workouts/range", (req, res) => {
   Workout.find({})
      .sort({ date: -1 })
      .then(dbWorkout => {
         res.json(dbWorkout);
      })
         .catch(err => {
            res.status(400).json(err)
         })
});

// -------------- HTML ROUTES --------------------------------

router.get("/", function(req,res) {
   res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/stats", function (req,res) {
   res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/exercise", function (req,res) {
   res.sendFile(path.join(__dirname, "../public/exercise.html"))
});



module.exports = router;