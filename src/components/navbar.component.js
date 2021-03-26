import React, { Component } from 'react'
import {Link} from 'react-router-dom';


export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Tracker</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {/* <li className="navbar-item">
                            <Link to="/" className="nav-link">Exercises</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li> */}
                        {/* <li className="navbar-item">
                            <Link to="/update-release-type" className="nav-link">Update Release Type</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/update-project-type" className="nav-link">Update Project Type</Link>
                        </li> */}
                        <li className="navbar-item">
                            <Link to="/update-release" className="nav-link">Releases</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/resource-types" className="nav-link">Resource Types</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/tasks" className="nav-link">Tasks</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/applications" className="nav-link">Applications</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/projects" className="nav-link">Projects</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/release-types" className="nav-link">Release Types</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/activites" className="nav-link">Activities</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/resources" className="nav-link">Resources</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/tests" className="nav-link">Test</Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        )
    }
}

