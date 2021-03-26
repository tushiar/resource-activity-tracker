const router = require('express').Router();
let Release = require('../models/release.model');


router.route('/').get((req, res)=>{
    Release.find()
    .then(release => res.json(release))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res)=>{
    const applicationName = req.body.applicationName;
    const releaseType = req.body.releaseType;
    const projectType = req.body.projectType;
    const releaseName = req.body.releaseName;
    // const type = req.body.type;
    // const status = req.body.status;

    const newRelease = new Release({
        applicationName,
        releaseType,
        projectType,
        releaseName,
        // type,
        // status,
    });

    newRelease.save()
    .then(() => res.json('Release added!'))
    .catch(err => res.status(400).json('Error: '+err));
});
router.route('/:applicationName').get((req, res) =>{
    Release.find({ applicationName: req.params.applicationName })
    .then(release=> res.json(release))
    .catch(err => res.status(400).json('Error: '+err));
});
router.route('/:id').get((req, res) =>{
    Release.findById(req.params.id)
    .then(release=> res.json(release))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) =>{
    Release.findByIdAndDelete(req.params.id)
    .then(release => res.json('Release deleted.'))
    .catch(err => res.status(400).json('Error: '+err));
});

router. route('/update/:id').post((req, res)=>{
    Release.findById(req.params.id)
    .then(release => {
        release.applicationName = req.body.applicationName;
        release.releaseType = req.body.releaseType;
        release.projectType = req.body.projectType;
        release.releaseName = req.body.releaseName;
        // resource.type = req.body.type;
        // resource.status = req.body.status;

        release.save()
        .then(()=> res.json('Release Updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});



module.exports = router;