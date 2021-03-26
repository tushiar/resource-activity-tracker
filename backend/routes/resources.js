const router = require('express').Router();
let Resource = require('../models/resource.model');


router.route('/').get((req, res)=>{
    Resource.find()
    .then(resources => res.json(resources))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const password = req.body.password;
    const type = req.body.resourceType;
    const status = req.body.status;

    const newResource = new Resource({
        firstName,
        lastName,
        userName,
        password,
        type,
        status,
    });

    newResource.save()
    .then(() => res.json('Resource added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req, res) =>{
    Resource.findById(req.params.id)
    .then(resource=> res.json(resource))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) =>{
    Resource.findByIdAndDelete(req.params.id)
    .then(resource => res.json('Resource deleted.'))
    .catch(err => res.status(400).json('Error: '+err));
});

router. route('/update/:id').post((req, res)=>{
    Resource.findById(req.params.id)
    .then(resource => {
        resource.firstName = req.body.firstName;
        resource.lastName = req.body.lastName;
        resource.userName = req.body.userName;
        resource.password = req.body.password;
        resource.type = req.body.resourceType;
        resource.status = req.body.status;

        resource.save()
        .then(()=> res.json('Resource Updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});



module.exports = router;