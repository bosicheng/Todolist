const router = require('express').Router();
let Task = require('../models/task.model');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

router.route('/').get((req,res) => {
    Task.find()
        .then(res => res.json())
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/').post((req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    const completed = Boolean(req.body.completed);
    const newTask = new Task({title,description,completed});
    newTask.save()
        .then(() => res.json("Task Added"))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').patch((req,res) => {
    Task.findById(req.params.id)
      .then(updatedTask => {
        updatedTask.title = req.body.title;
        updatedTask.description = req.body.description;
        updatedTask.completed = Boolean(req.body.completed);
  
        updatedTask.save()
          .then(() => res.json('Task updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));

})

router.route('/:id').delete((req,res) => {
    Task.findByIdAndRemove(req.params.id,(err,deletedTask) => {
        if(err){
            console.log("Error deleting a task");
        }else{
            res.json(deletedTask);
        }
    })
})

router.route('/:id').put((req,res) => {
    Task.findById(req.params.id)
      .then(updatedTask => {
        updatedTask.completed = true;
  
        updatedTask.save()
          .then(() => res.json('Task completed!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/',(req,res) => {
    res.send("API working");
})

module.exports = router;