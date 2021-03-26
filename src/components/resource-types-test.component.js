import React, { Component } from 'react';
import axios from 'axios';


// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
const ResourceType = props =>(

    <tr>
        <td>{props.resourceType.resourceTypeName}</td>
        {/* <td>{props.application.applicationName}</td> */}
        {/* <td>{props.release.projectType}</td>
        <td>{props.release.releaseType}</td>
        <td>{props.release.releaseName}</td> */}
       
        <td>
        <a href="#" onClick={()=>{props.editResourceType(props.resourceType._id)}}>edit</a> | <a href="#" onClick={()=>{props.deleteResourceType(props.resourceType._id)}}>delete</a>
        </td>
    </tr>
)
export default class TestResourceType extends Component {
    constructor(props){
        super(props);

        // this.onChangeApplicationName = this.onChangeApplicationName.bind(this);
        // // this.onChangeResourceType = this.onChangeResourceType.bind(this);
        // this.onChangeProjectType = this.onChangeProjectType.bind(this);
        // this.onChangeReleaseType = this.onChangeReleaseType.bind(this);
        // this.onChangeRelease = this.onChangeRelease.bind(this);
        this.editResourceType = this.editResourceType.bind(this);
        this.deleteResourceType = this.deleteResourceType.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            resourceTypeName : '',
            // resourceType : '',
            // projectType: '',
            // releaseType: '',
            // releaseName:'',
            resourceTypes: [],
            // releaseTypes: [],
            // resourceTypes:[],
            // projectTypes:[],
            // releases:[],
            submitButton: 'Add Resource Type',
            editId: '',
            type: true

        }
    }

    componentDidMount(){
        // axios.get('http://localhost:5000/releases/')
        // .then(res =>{
        //     this.setState({
        //         releases:res.data
        //     })
        // })
        // .catch(err => {console.log(err)})

        

        // axios.get('http://localhost:5000/applications/')
        // .then(res =>{
        //     if(res.data.length > 0){
        //         this.setState({
        //             applications: res.data.map(application => application.applicationName),
        //             // applicationName: res.data[0].applicationName
        //         })
        //     }
        // })
        axios.get('http://localhost:5000/resource-type/')
        .then(res =>{
            if(res.data.length > 0){
                this.setState({
                    resourceTypes: res.data.map(resourceType => resourceType.resourceTypeName),
                    // releaseType: res.data[0].releaseTypeName
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
        axios.get('http://localhost:5000/resource-type/')
        .then(res =>{
            this.setState({
                resourceTypes: res.data,
                // editId: res.data._id
                // submitButton: "Add Project"
                
            })
        })
        .catch(err => {console.log(err)})

    }

    resourceTypesList(){
        return this.state.resourceTypes.map(currentresourceType =>{
            return <ResourceType resourceType={currentresourceType} editResourceType={this.editResourceType} deleteResourceType={this.deleteResourceType} key={currentresourceType._id}/>;
        })
    }
    onChangeContent(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const resourceType = {
            "resourceTypeName": this.state.resourceTypeName,
            "status": "Insert"
            // "releaseType": this.state.releaseType,
            // // "resourceType": this.state.resourceType,
            // "projectType":this.state.projectType,
            // "releaseName": this.state.releaseName
        }

        

        
        if(this.state.type){
            axios.post('http://localhost:5000/resource-type/add', resourceType)
            .then(res=> console.log(res.data));
            console.log(resourceType)
           

        }
        else{
            resourceType.status ="Update"
            axios.post('http://localhost:5000/resource-type/update/'+this.state.editId, resourceType)
            .then(res=> console.log(res.data));
            console.log(resourceType)
    
            // window.location="/";
            this.setState({
                resourceTypeName:'',
                submitButton: 'Add Resource Type',
                // title: "Add Project Type",
                type: true
            })
        }


        // window.location="/";
    }
    editResourceType(id){
        axios.get('http://localhost:5000/resource-type/'+id)
        .then(res =>{
            this.setState({
                resourceTypeName: res.data.resourceTypeName,
            //     projectType: res.data.projectType,
            //     releaseType: res.data.releaseType,
            // // "resourceType": this.state.resourceType,
            //     releaseName: res.data.releaseName,
                submitButton: 'Update Resource Type',
                type: false,
                editId: id,
                // title: 'Update Project Type'
            })
        })
        .catch(function (error){
            console.log(error);
        })
    }
    deleteResourceType(id){
        axios.delete('http://localhost:5000/resource-type/'+id)
        .then(res=>console.log(res.data));
        this.setState({
            resourceTypes: this.state.resourceTypes.filter(el => el._id !== id)
        })
    }

    render() {
        return (
            <div>
                <h3>Resource Types</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group table-responsive">
                          
                        <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Resource Type</th>
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
                                name="resourceTypeName"
                                className="form-control"
                                value={this.state.resourceTypeName}
                                onChange={this.onChangeContent}
                                />
                            </td>
                            {/* <td>
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
                            </td> */}
                            <td><input type="submit" value={this.state.submitButton} className="btn btn-primary" /></td>
                            
                            </tr>
                            {this.resourceTypesList()}
                            </tbody>
                        </table>
                    </div>
                </form> 
            </div>
        )
    }
}

