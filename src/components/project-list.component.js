import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Project = props =>(
    <tr>
        <td>{props.project.projectTypeName}</td>
        {/* <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td> */}
        <td>
            <Link to={"/edit/"+props.project._id}>edit</Link> | <a href="#" onClick={()=>{props.deleteProject(props.project._id)}}>delete</a>
        </td>
    </tr>
)

export default class ProjectsList extends Component {
    constructor(props){
        super(props);

        this.deleteProject = this.deleteProject.bind(this);
        this.state = {projects: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/project-type/')
        .then(res =>{
            this.setState({
                projects:res.data
            })
        })
        .catch(err => {console.log(err)})

    }

    deleteProject(id){
        axios.delete('http://localhost:5000/project-type/'+id)
        .then(res=>console.log(res.data));
        this.setState({
            projects: this.state.projects.filter(el => el._id !== id)
        })
    }

    projectsList(){
        return this.state.projects.map(currentproject =>{
            return <Project project={currentproject} deleteProject={this.deleteProject} key={currentproject._id}/>;
        })
    }

    render() {
        return (
            
            <div>
                <h3>Logged Projects</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Project Name</th>
                            
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.projectsList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

