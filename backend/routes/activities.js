const router = require('express').Router();

let Activity = require('../models/activity.model');


router.route('/').get((req, res)=>{
    Activity.find()
    .then(activity => res.json(activity))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res)=>{
    const year = req.body.year;
    const month = req.body.month;
    const timeslot = req.body.timeslot;
    const applicationName = req.body.applicationName;
    const releaseName = req.body.releaseName;
    const taskName = req.body.taskName;
    const hours = req.body.hours;

    // const type = req.body.type;
    // const status = req.body.status;

    const newActivity = new Activity({
        year,
        month,
        timeslot,
        applicationName,
        releaseName,
        taskName,
        hours
        // type,
        // status,
    });

    newActivity.save()
    .then(() => res.json('Activity added!'))
    .catch(err => res.status(400).json('Error: '+err));
});
// router.route('/:applicationName').get((req, res) =>{
//     Release.find({ applicationName: req.params.applicationName })
//     .then(release=> res.json(release))
//     .catch(err => res.status(400).json('Error: '+err));
// });
router.route('/:id').get((req, res) =>{
    Activity.findById(req.params.id)
    .then(activity=> res.json(activity))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) =>{
    Activity.findByIdAndDelete(req.params.id)
    .then(activity => res.json('Activity deleted.'))
    .catch(err => res.status(400).json('Error: '+err));
});

router. route('/update/:id').post((req, res)=>{
    Activity.findById(req.params.id)
    .then(activity => {
        activity.year = req.body.year;
        activity.month = req.body.month;
        activity.timeslot = req.body.timeslot;
        activity.applicationName = req.body.applicationName;
        activity.releaseName = req.body.releaseName;
        activity.taskName = req.body.taskName;

        activity.save()
        .then(()=> res.json('Activity Updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});



module.exports = router;