import React, { Component } from 'react';
import axios from 'axios';


// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
const Task = props =>(

    <tr>
        <td>{props.task.taskName}</td>
        {/* <td>{props.application.applicationName}</td> */}
        {/* <td>{props.release.projectType}</td>
        <td>{props.release.releaseType}</td>
        <td>{props.release.releaseName}</td> */}
       
        <td>
        <a href="#" onClick={()=>{props.editTask(props.task._id)}}>edit</a> | <a href="#" onClick={()=>{props.deleteTask(props.task._id)}}>delete</a>
        </td>
    </tr>
)
export default class TestTask extends Component {
    constructor(props){
        super(props);

        // this.onChangeApplicationName = this.onChangeApplicationName.bind(this);
        // // this.onChangeResourceType = this.onChangeResourceType.bind(this);
        // this.onChangeProjectType = this.onChangeProjectType.bind(this);
        // this.onChangeReleaseType = this.onChangeReleaseType.bind(this);
        // this.onChangeRelease = this.onChangeRelease.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            taskName : '',
            // resourceType : '',
            // projectType: '',
            // releaseType: '',
            // releaseName:'',
            tasks: [],
            // releaseTypes: [],
            // resourceTypes:[],
            // projectTypes:[],
            // releases:[],
            submitButton: 'Add Task',
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
        axios.get('http://localhost:5000/tasks/')
        .then(res =>{
            if(res.data.length > 0){
                this.setState({
                    tasks: res.data.map(task => task.taskName),
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
        axios.get('http://localhost:5000/tasks/')
        .then(res =>{
            this.setState({
                tasks: res.data,
                // editId: res.data._id
                // submitButton: "Add Project"
                
            })
        })
        .catch(err => {console.log(err)})

    }

    taskList(){
        return this.state.tasks.map(currentTask =>{
            return <Task task={currentTask} editTask={this.editTask} deleteTask={this.deleteTask} key={currentTask._id}/>;
        })
    }
    onChangeContent(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const task = {
            "taskName": this.state.taskName,
            "status": "Insert"
            // "releaseType": this.state.releaseType,
            // // "resourceType": this.state.resourceType,
            // "projectType":this.state.projectType,
            // "releaseName": this.state.releaseName
        }

        

        
        if(this.state.type){
            axios.post('http://localhost:5000/tasks/add', task)
            .then(res=> console.log(res.data));
            console.log(task)
           

        }
        else{
            task.status ="Update"
            axios.post('http://localhost:5000/tasks/update/'+this.state.editId, task)
            .then(res=> console.log(res.data));
            console.log(task)
    
            // window.location="/";
            this.setState({
                taskName:'',
                submitButton: 'Add Task',
                // title: "Add Project Type",
                type: true
            })
        }


        // window.location="/";
    }
    editTask(id){
        axios.get('http://localhost:5000/tasks/'+id)
        .then(res =>{
            this.setState({
                taskName: res.data.taskName,
            //     projectType: res.data.projectType,
            //     releaseType: res.data.releaseType,
            // // "resourceType": this.state.resourceType,
            //     releaseName: res.data.releaseName,
                submitButton: 'Update Task',
                type: false,
                editId: id,
                // title: 'Update Project Type'
            })
        })
        .catch(function (error){
            console.log(error);
        })
    }
    deleteTask(id){
        axios.delete('http://localhost:5000/tasks/'+id)
        .then(res=>console.log(res.data));
        this.setState({
            tasks: this.state.tasks.filter(el => el._id !== id)
        })
    }

    render() {
        return (
            <div>
                <h3>Tasks</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group table-responsive">
                          
                        <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Task Name</th>
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
                                name="taskName"
                                className="form-control"
                                value={this.state.taskName}
                                onChange={this.onChangeContent}
                                />
                            </td>
                            
                            <td><input type="submit" value={this.state.submitButton} className="btn btn-primary" /></td>
                            
                            </tr>
                            {this.taskList()}
                            </tbody>
                        </table>
                    </div>
                </form> 
            </div>
        )
    }
}

