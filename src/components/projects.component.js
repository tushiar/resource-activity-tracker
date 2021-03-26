import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Project = props =>(

    <tr>
        <td>{props.project.projectTypeName}</td>

        
      
        <td>
        <a href="#" onClick={()=>{props.editProject(props.project._id)}}>edit</a> | <a href="#" onClick={()=>{props.deleteProject(props.project._id)}}>delete</a>
        </td>
    </tr>
)

export default class Projects extends Component {
    constructor(props){
        super(props);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.editProject = this.editProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.state = {projects: [],
            submitButton: '',
            projectTypeName: '',
            type: true,
            editId: ''
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/project-type/')
        .then(res =>{
            this.setState({
                projects:res.data,
                submitButton: "Add Project",
               
                type: true                
            })
        })
        .catch(err => {console.log(err)})

    }
    componentDidUpdate(){
        axios.get('http://localhost:5000/project-type/')
        .then(res =>{
            this.setState({
                projects:res.data,
                // editId: res.data._id
                // submitButton: "Add Project"
                
            })
        })
        .catch(err => {console.log(err)})

    }

    onChangeContent(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const projectType = {
            "projectTypeName": this.state.projectTypeName,
            
        }
        if(this.state.type){
            axios.post('http://localhost:5000/project-type/add', projectType)
            .then(res=> console.log(res.data));
            console.log(projectType)
            this.setState({
                projectTypeName:''
            })
            
           

        }
        else{
            
            axios.post('http://localhost:5000/project-type/update/'+this.state.editId, projectType)
            .then(res=> console.log(res.data));
            console.log(projectType)
    
            // window.location="/";
            this.setState({
                projectTypeName:'',
                submitButton: 'Add Project',
                
                type: true
            })
        }
        

        
        
    }

    deleteProject(id){
        axios.delete('http://localhost:5000/project-type/'+id)
        .then(res=>console.log(res.data));
        this.setState({
            projects: this.state.projects.filter(el => el._id !== id)
        })
    }
    editProject(id){
        axios.get('http://localhost:5000/project-type/'+id)
        .then(res =>{
            this.setState({
                projectTypeName: res.data.projectTypeName,
                submitButton: 'Update Project',
                type: false,
                editId: id,
               
            })
        })
        .catch(function (error){
            console.log(error);
        })
    }

    projectsList(){
        return this.state.projects.map(currentproject =>{
            return <Project project={currentproject} deleteProject={this.deleteProject} editProject={this.editProject} key={currentproject._id}/>;
        })
    }

    render() {
        return (
           
            <div>
            <h3>Projects</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group table-responsive">
                      
                    <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Project Name</th>
                            {/* <th>Project Type</th>
                            <th>Release Type</th>
                            <th>Release Name</th> */}
                            <th>Actions</th>
                            
                        </tr>
                    </thead>
                        <tbody>
                        <tr>
                            <td>
                            <input type="text"
                            required
                            name="projectTypeName"
                            className="form-control"
                            value={this.state.projectTypeName}
                            onChange={this.onChangeContent}
                            />
                        </td>
                        
                        <td><input type="submit" value={this.state.submitButton} className="btn btn-primary" /></td>
                        
                        </tr>
                        {this.projectsList()}
                        </tbody>
                    </table>
                </div>
            </form> 
        </div>

        )
    }
}

