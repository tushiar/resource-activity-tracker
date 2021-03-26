const router = require('express').Router();
let ReleaseType = require('../models/release-type.model');

router.route('/').get((req, res)=>{
    ReleaseType.find()
    .then(releasetypes => res.json(releasetypes))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) =>{
    // const releaseType = req.body.relTypeName;
    const releaseTypeName = req.body.releaseTypeName;
    const releaseTypeStatus = req.body.status;
    // const newRelease = new ReleaseType({releaseTypeName});
    const newReleaseType = new ReleaseType({
        releaseTypeName,
        releaseTypeStatus,
    });

    newReleaseType.save()
    .then(() => res.json('Release Type added!'))
    .catch(err => res.status(400).json('Error: '+err));
});
router.route('/:id').get((req, res) =>{
    ReleaseType.findById(req.params.id)
    .then(releasetype=> res.json(releasetype))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) =>{
    ReleaseType.findByIdAndDelete(req.params.id)
    .then(releasetype => res.json('Release Type deleted.'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req, res)=>{
    ReleaseType.findById(req.params.id)
    .then(releasetype => {
        releasetype.releaseTypeName = req.body.releaseTypeName;
        // exercise.description = req.body.description;
        // exercise.duration = Number(req.body.duration);
        // exercise.date = Date.parse(req.body.date);

        releasetype.save()
        .then(()=> res.json('Release Type Updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;