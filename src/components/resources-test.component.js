import React, { Component } from 'react';
import axios from 'axios';

// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
const Resource = props =>(

    <tr>
        <td>{props.resource.firstName}</td>
        <td>{props.resource.lastName}</td>
        <td>{props.resource.userName}</td>
        <td>{props.resource.password}</td>
        <td>{props.resource.type}</td>
        <td>
        <a href="#" onClick={()=>{props.editResource(props.resource._id)}}>edit</a> | <a href="#" onClick={()=>{props.deleteResource(props.release._id)}}>delete</a>
        </td>
    </tr>
)
export default class TestResource extends Component {
    constructor(props){
        super(props);

        // this.onChangeApplicationName = this.onChangeApplicationName.bind(this);
        // // this.onChangeResourceType = this.onChangeResourceType.bind(this);
        // this.onChangeProjectType = this.onChangeProjectType.bind(this);
        // this.onChangeReleaseType = this.onChangeReleaseType.bind(this);
        // this.onChangeRelease = this.onChangeRelease.bind(this);
        this.editResource = this.editResource.bind(this);
        this.deleteResource = this.deleteResource.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            firstName : '',
            resourceType : '',
            lastName: '',
            userName: '',
            password:'',
            firstNames: [],
            lastNames: [],
            resources:[],
            resourceTypes:[],
            userNames:[],
            passwords:[],
            submitButton: 'Add Resource',
            editId: '',
            type: true

        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/resources/')
        .then(res =>{
            this.setState({
                resources:res.data
            })
        })
        .catch(err => {console.log(err)})

        

        axios.get('http://localhost:5000/resource-type/')
        .then(res =>{
            if(res.data.length > 0){
                this.setState({
                    resourceTypes: res.data.map(resourceType => resourceType.resourceTypeName),
                    resourceType: res.data[0].resourceTypeName
                })
            }
        })
        // axios.get('http://localhost:5000/release-type/')
        // .then(res =>{
        //     if(res.data.length > 0){
        //         this.setState({
        //             releaseTypes: res.data.map(releaseType => releaseType.releaseTypeName),
        //             releaseType: res.data[0].releaseTypeName
        //         })
        //     }
        // })
        // axios.get('http://localhost:5000/resource-type/')
        // .then(res =>{
        //     if(res.data.length > 0){
        //         this.setState({
        //             resourceTypes: res.data.map(resourceType => resourceType.resourceTypeName),
        //             applicationName: res.data[0].applicationName
        //         })
        //     }
        // })

        // axios.get('http://localhost:5000/project-type/')
        // .then(res =>{
        //     if(res.data.length > 0){
        //         this.setState({
        //             projectTypes: res.data.map(project => project.projectTypeName),
        //             projectType: res.data[0].projectTypeName
        //         })
        //     }
        // })
    }
    componentDidUpdate(){
        axios.get('http://localhost:5000/resources/')
        .then(res =>{
            this.setState({
                resources: res.data,
                // editId: res.data._id
                // submitButton: "Add Project"
                
            })
        })
        .catch(err => {console.log(err)})

    }

    resourcelist(){
        return this.state.resources.map(currentresource =>{
            return <Resource resource={currentresource} editResource={this.editResource} deleteResource={this.deleteResource} key={currentresource._id}/>;
        })
    }
    onChangeContent(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const resourceInfo = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "resourceType": this.state.resourceType,
            "userName":this.state.userName,
            "password": this.state.password,
            "status": "Insert"
        }

        this.setState({
            firstName:'',
            lastName:'',
            userName:'',
            password:'',
            resourceType:''
        })

        
        if(this.state.type){
            axios.post('http://localhost:5000/resources/add', resourceInfo)
            .then(res=> console.log(res.data));
            console.log(resourceInfo)
           

        }
        else{
            resourceInfo.status="Update"
            axios.post('http://localhost:5000/resources/update/'+this.state.editId, resourceInfo)
            .then(res=> console.log(res.data));
            console.log(resourceInfo)
    
            // window.location="/";
            this.setState({
                

                submitButton: 'Add Resource',
                // title: "Add Project Type",
                type: true
            })
        }


        // window.location="/";
    }
    editResource(id){
        axios.get('http://localhost:5000/resources/'+id)
        .then(res =>{
            this.setState({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                resourceType: res.data.type,
                userName: res.data.userName,
                password: res.data.password,
                submitButton: 'Update Resource',
                type: false,
                editId: id,
                // title: 'Update Project Type'
            })
        })
        .catch(function (error){
            console.log(error);
        })
    }
    deleteResource(id){
        axios.delete('http://localhost:5000/resources/'+id)
        .then(res=>console.log(res.data));
        this.setState({
            resources: this.state.resources.filter(el => el._id !== id)
        })
    }

    render() {
        return (
            <div>
                <h3>Resources</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group table-responsive">
                          
                        <table className="table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Resource Type</th>
                                <th>Actions</th>
                                
                            </tr>
                        </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input type="text"
                                        required
                                        name="firstName"
                                        className="form-control"
                                        value={this.state.firstName}
                                        onChange={this.onChangeContent}
                                    />
                            </td>
                            <td>
                                    <input type="text"
                                        required
                                        name="lastName"
                                        className="form-control"
                                        value={this.state.lastName}
                                        onChange={this.onChangeContent}
                                    />
                            </td>
                            <td>
                                    <input type="text"
                                        required
                                        name="userName"
                                        className="form-control"
                                        value={this.state.userName}
                                        onChange={this.onChangeContent}
                                    />
                            </td>
                            <td>
                                    <input type="text"
                                        required
                                        name="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={this.onChangeContent}
                                    />
                            </td>
                            <td>
                                    <select ref="userInput" 
                                        required
                                        name="resourceType"
                                        className="form-control"
                                        value={this.state.resourceType}
                                        onChange={this.onChangeContent}>
                                        {
                                            this.state.resourceTypes.map(function(resourceType){
                                                return <option
                                                key={resourceType}
                                                value={resourceType}>{resourceType}</option>;
                                            })
                                        }
                                        </select>
                            </td>
                            <td><input type="submit" value={this.state.submitButton} className="btn btn-primary" /></td>
                            
                            </tr>
                            {this.resourcelist()}
                            </tbody>
                        </table>
                    </div>
                </form> 
            </div>
        )
    }
}

