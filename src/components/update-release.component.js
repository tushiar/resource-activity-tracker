import React, { Component } from 'react';
import axios from 'axios';

// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
const Release = props =>(

    <tr>
        <td>{props.release.applicationName}</td>
        <td>{props.release.projectType}</td>
        <td>{props.release.releaseType}</td>
        <td>{props.release.releaseName}</td>
       
        <td>
        <a href="#" onClick={()=>{props.editRelease(props.release._id)}}>edit</a> | <a href="#" onClick={()=>{props.deleteRelease(props.release._id)}}>delete</a>
        </td>
    </tr>
)
export default class UpdateRelease extends Component {
    constructor(props){
        super(props);

        // this.onChangeApplicationName = this.onChangeApplicationName.bind(this);
        // // this.onChangeResourceType = this.onChangeResourceType.bind(this);
        // this.onChangeProjectType = this.onChangeProjectType.bind(this);
        // this.onChangeReleaseType = this.onChangeReleaseType.bind(this);
        // this.onChangeRelease = this.onChangeRelease.bind(this);
        this.editRelease = this.editRelease.bind(this);
        this.deleteRelease = this.deleteRelease.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            applicationName : '',
            // resourceType : '',
            projectType: '',
            releaseType: '',
            releaseName:'',
            applications: [],
            releaseTypes: [],
            // resourceTypes:[],
            projectTypes:[],
            releases:[],
            submitButton: 'Add Release',
            editId: '',
            type: true

        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/releases/')
        .then(res =>{
            this.setState({
                releases:res.data
            })
        })
        .catch(err => {console.log(err)})

        

        axios.get('http://localhost:5000/applications/')
        .then(res =>{
            if(res.data.length > 0){
                this.setState({
                    applications: res.data.map(application => application.applicationName),
                    applicationName: res.data[0].applicationName
                })
            }
        })
        axios.get('http://localhost:5000/release-type/')
        .then(res =>{
            if(res.data.length > 0){
                this.setState({
                    releaseTypes: res.data.map(releaseType => releaseType.releaseTypeName),
                    releaseType: res.data[0].releaseTypeName
                })
            }
        })
        // axios.get('http://localhost:5000/resource-type/')
        // .then(res =>{
        //     if(res.data.length > 0){
        //         this.setState({
        //             resourceTypes: res.data.map(resourceType => resourceType.resourceTypeName),
        //             applicationName: res.data[0].applicationName
        //         })
        //     }
        // })

        axios.get('http://localhost:5000/project-type/')
        .then(res =>{
            if(res.data.length > 0){
                this.setState({
                    projectTypes: res.data.map(project => project.projectTypeName),
                    projectType: res.data[0].projectTypeName
                })
            }
        })
    }
    componentDidUpdate(){
        axios.get('http://localhost:5000/releases/')
        .then(res =>{
            this.setState({
                releases: res.data,
                // editId: res.data._id
                // submitButton: "Add Project"
                
            })
        })
        .catch(err => {console.log(err)})

    }

    releaselist(){
        return this.state.releases.map(currentrelease =>{
            return <Release release={currentrelease} editRelease={this.editRelease} deleteRelease={this.deleteRelease} key={currentrelease._id}/>;
        })
    }
    onChangeContent(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const releaseInfo = {
            "applicationName": this.state.applicationName,
            "releaseType": this.state.releaseType,
            // "resourceType": this.state.resourceType,
            "projectType":this.state.projectType,
            "releaseName": this.state.releaseName
        }

        

        
        if(this.state.type){
            axios.post('http://localhost:5000/releases/add', releaseInfo)
            .then(res=> console.log(res.data));
            console.log(releaseInfo)
           

        }
        else{
            
            axios.post('http://localhost:5000/releases/update/'+this.state.editId, releaseInfo)
            .then(res=> console.log(res.data));
            console.log(releaseInfo)
    
            // window.location="/";
            this.setState({
                releaseName:'',
                submitButton: 'Add Release',
                // title: "Add Project Type",
                type: true
            })
        }


        // window.location="/";
    }
    editRelease(id){
        axios.get('http://localhost:5000/releases/'+id)
        .then(res =>{
            this.setState({
                applicationName: res.data.applicationName,
                projectType: res.data.projectType,
                releaseType: res.data.releaseType,
            // "resourceType": this.state.resourceType,
                releaseName: res.data.releaseName,
                submitButton: 'Update Release',
                type: false,
                editId: id,
                // title: 'Update Project Type'
            })
        })
        .catch(function (error){
            console.log(error);
        })
    }
    deleteRelease(id){
        axios.delete('http://localhost:5000/releases/'+id)
        .then(res=>console.log(res.data));
        this.setState({
            releases: this.state.releases.filter(el => el._id !== id)
        })
    }

    render() {
        return (
            <div>
                <h3>Releases</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group table-responsive">
                          
                        <table className="table">
                        <thead>
                            <tr>
                                <th>Application</th>
                                <th>Project Type</th>
                                <th>Release Type</th>
                                <th>Release Name</th>
                                <th>Actions</th>
                                
                            </tr>
                        </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <select ref="userInput" 
                                    required
                                    name="applicationName"
                                    className="form-control"
                                    value={this.state.applicationName}
                                    onChange={this.onChangeContent}>
                                    {
                                        this.state.applications.map(function(application){
                                            return <option
                                            key={application}
                                            value={application}>{application}</option>;
                                        })
                                    }
                                    </select>  
                            </td>
                            <td>
                                <select ref="userInput" 
                                required
                                name="projectType"
                                className="form-control"
                                value={this.state.projectType}
                                onChange={this.onChangeContent}>
                                {
                                    this.state.projectTypes.map(function(project){
                                        return <option
                                        key={project}
                                        value={project}>{project}</option>;
                                    })
                                }
                                </select>
                            </td>
                            <td>
                                <select ref="userInput" 
                                required
                                name="releaseType"
                                className="form-control"
                                value={this.state.releaseType}
                                onChange={this.onChangeContent}>
                                {
                                    this.state.releaseTypes.map(function(releaseType){
                                        return <option
                                        key={releaseType}
                                        value={releaseType}>{releaseType}</option>;
                                    })
                                }
                                </select>
                            </td>
                            <td>
                                <input type="text"
                         
                         required
                                name="releaseName"
                                className="form-control"
                                value={this.state.releaseName}
                                onChange={this.onChangeContent}
                                />
                            </td>
                            <td><input type="submit" value={this.state.submitButton} className="btn btn-primary" /></td>
                            
                            </tr>
                            {this.releaselist()}
                            </tbody>
                        </table>
                    </div>
                </form> 
            </div>
        )
    }
}

