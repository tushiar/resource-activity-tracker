const router = require('express').Router();
let Application = require('../models/application.model');
// const { route } = require('./users');

router.route('/').get((req,res)=>{
    Application.find()
    .then(applications => res.json(applications))
    .catch(err=> res.status().json('Error: '+err))
})

router.route('/add').post((req, res)=>{
    const applicationName = req.body.applicationName;
    const status = req.body.status;

    const newApplication = new Application({
        applicationName,
        status,
    });
    newApplication.save()
    .then(()=>res.json('Application Added!'))
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/:id').get((req, res) =>{
    Application.findById(req.params.id)
    .then(application=> res.json(application))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) =>{
    Application.findByIdAndDelete(req.params.id)
    .then(application => res.json('Application deleted.'))
    .catch(err => res.status(400).json('Error: '+err));
});

router. route('/update/:id').post((req, res)=>{
    Application.findById(req.params.id)
    .then(application => {
        application.applicationName = req.body.applicationName;
        application.status = req.body.status;

        application.save()
        .then(()=> res.json('Application Updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;