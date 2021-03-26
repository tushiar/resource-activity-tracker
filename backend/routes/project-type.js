const router = require('express').Router();
let ProjectType = require('../models/project-type.model');
// let User = require('../models/user.model');

router.route('/').get((req, res)=>{
    ProjectType.find()
    .then(projecttypes => res.json(projecttypes))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) =>{
    // const releaseType = req.body.relTypeName;
    const projectTypeName = req.body.projectTypeName;
    const newProject = new ProjectType({projectTypeName});

    newProject.save()
    .then(() => res.json('Project Type added!'))
    .catch(err => res.status(400).json('Error: '+err));
});
router.route('/:id').get((req, res) =>{
    ProjectType.findById(req.params.id)
    .then(project=> res.json(project))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) =>{
    ProjectType.findByIdAndDelete(req.params.id)
    .then(project => res.json('Project deleted.'))
    .catch(err => res.status(400).json('Error: '+err));
});

router. route('/update/:id').post((req, res)=>{
    ProjectType.findById(req.params.id)
    .then(project => {
        project.projectTypeName = req.body.projectTypeName;
        // exercise.description = req.body.description;
        // exercise.duration = Number(req.body.duration);
        // exercise.date = Date.parse(req.body.date);

        project.save()
        .then(()=> res.json('Project Updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});


module.exports = router;