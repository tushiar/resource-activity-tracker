const router = require('express').Router();
let ResourceType = require('../models/resource-type.model');

router.route('/').get((req, res)=>{
    ResourceType.find()
    .then(resourcetypes => res.json(resourcetypes))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) =>{
    // const releaseType = req.body.relTypeName;
    const resourceTypeName = req.body.resourceTypeName;
    const resourceTypeStatus = req.body.status;
    // const newRelease = new ReleaseType({releaseTypeName});
    const newResourceType = new ResourceType({
        resourceTypeName,
        resourceTypeStatus,
    });

    newResourceType.save()
    .then(() => res.json('Resource Type added!'))
    .catch(err => res.status(400).json('Error: '+err));
});
router.route('/:id').get((req, res) =>{
    ResourceType.findById(req.params.id)
    .then(resourcetype=> res.json(resourcetype))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) =>{
    ResourceType.findByIdAndDelete(req.params.id)
    .then(resourcetype => res.json('Resource Type deleted.'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req, res)=>{
    ResourceType.findById(req.params.id)
    .then(resourcetype => {
        resourcetype.resourceTypeName = req.body.resourceTypeName;
        // exercise.description = req.body.description;
        // exercise.duration = Number(req.body.duration);
        // exercise.date = Date.parse(req.body.date);

        resourcetype.save()
        .then(()=> res.json('Resource Type Updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;