const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// start for database connection
const uri = process.env.MY_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})
// end for database connection

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const releaseTypeRouter = require('./routes/release-type');
const projectTypeRouter = require('./routes/project-type');
const resourceRouter = require('./routes/resources');
const applicationRouter = require('./routes/applications');
const releaseRouter = require('./routes/releases');
const resourceTypeRouter = require('./routes/resource-type');
const taskRouter = require('./routes/tasks');
const activityRouter = require('./routes/activities');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/release-type', releaseTypeRouter);
app.use('/project-type', projectTypeRouter);
app.use('/resources', resourceRouter);
app.use('/applications', applicationRouter);
app.use('/releases', releaseRouter);
app.use('/resource-type', resourceTypeRouter);
app.use('/tasks', taskRouter);
app.use('/activities', activityRouter);
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});