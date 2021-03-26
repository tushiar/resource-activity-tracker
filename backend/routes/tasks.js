const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req, res)=>{
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) =>{
    // const releaseType = req.body.relTypeName;
    const taskName = req.body.taskName;
    const taskStatus = req.body.status;
    // const newRelease = new ReleaseType({releaseTypeName});
    const newTask = new Task({
        taskName,
        taskStatus,
    });

    newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: '+err));
});
router.route('/:id').get((req, res) =>{
    Task.findById(req.params.id)
    .then(task=> res.json(task))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) =>{
    Task.findByIdAndDelete(req.params.id)
    .then(task => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req, res)=>{
    Task.findById(req.params.id)
    .then(task => {
        task.taskName = req.body.taskName;
        // exercise.description = req.body.description;
        // exercise.duration = Number(req.body.duration);
        // exercise.date = Date.parse(req.body.date);

        task.save()
        .then(()=> res.json('Task Updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;