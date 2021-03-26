import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import UpdateReleaseType from './components/update-release-type.component';
import UpdateProjectType from './components/update-project-type.component';
import UpdateRelease from './components/update-release.component';
import ProjectList from './components/project-list.component';
import TestResourceType from './components/resource-types-test.component';
import TestApplication from './components/applications-test.component';
import Projects from './components/projects.component';
import Activities from './components/activities-test.component';
import TestReleaseType from  './components/release-types-test.component'
import TestProjectType from './components/project-types-test.component';
import TestTask from './components/tasks-test.component';
import TestResource from './components/resources-test.component';
import Test from './components/test';



function App() {
  return (
    <Router>
      <div className="">
        <Navbar/>
        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        {/* <Route path="/edit-project/:id" component={EditProject} /> */}
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
        <Route path="/applications" component={TestApplication} />
        <Route path="/update-release-type" component={UpdateReleaseType} />
        <Route path="/update-project-type" component={UpdateProjectType} />
        <Route path="/update-release" component={UpdateRelease} />
        <Route path="/project-list" component={ProjectList} />
        <Route path="/project-types" component={Projects} />
        <Route path="/release-types" component={TestReleaseType} />
        <Route path="/resource-types" component={TestResourceType} />
        <Route path="/projects" component={Projects} />
        <Route path="/activites" component={Activities} />
        <Route path="/tasks" component={TestTask} />
        <Route path="/resources" component={TestResource} />
        <Route path="/tests" component={Test} />

      </div>
    </Router>
  );
}

export default App;
