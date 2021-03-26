import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./activities.component.css";

const Tab = props =>(

    <tr>
        <td>{props.activity.applicationName}</td>
        <td>{props.activity.releaseName}</td>
        <td>{props.activity.taskName}</td>
        <td>{props.release.releaseName}</td>
       
        <td>
        <a href="#" onClick={()=>{props.editRelease(props.release._id)}}>edit</a> | <a href="#" onClick={()=>{props.deleteRelease(props.release._id)}}>delete</a>
        </td>
    </tr>
)
const hours=[]

export default class Activities extends Component {
    constructor(props){
        super(props);

        
        this.generateDateHeader = this.generateDateHeader.bind(this);
        this.generateIndividualInput = this.generateIndividualInput.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeHours = this.onChangeHours.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
               
        for(var i=0; i< 16; i++){
            this.state ={
                ["hoursworked"+i]: ''
            }
        }
        this.state = {
            // username : '',
            // description : '',
            // duration : 0,
            
            application:'',
            release:'',
            task: '',
            year:'',
            monthName: '',
            timeslot:'',
            startDate: new Date(),
            endDate: new Date(),
            // hoursworked:'',
            selectedDate:'',
            years:["2018", "2019", "2020"],
            monthNames:[ "January", "February", "March", "April", "May", "June",
             "July", "August", "September", "October", "November", "December" ],
            timeslots:["First Half", "Second Half"],
            // enddate: new Date(),
            applications: [],
            tasks:[],
            releases:[],
            tabs:[],
            hoursTested:[]
            
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:5000/applications/')
        .then(res =>{
            if(res.data.length > 0){
                this.setState({
                    applications: res.data.map(application => application.applicationName),
                    application: res.data[0].applicationName
                })
            }
        })
        axios.get('http://localhost:5000/tasks/')
        .then(res =>{
            this.setState({
                
                tasks: res.data.map(task => task.taskName),
                task: res.data[0].taskName
                
            })
        })
        .catch(err => {console.log(err)})

    }
    componentDidUpdate(){
        axios.get('http://localhost:5000/releases/' +this.state.application)
        .then(res =>{
            if(res.data.length > 0){
                this.setState({
                
                    releases: res.data.map(release => release.releaseName),
                    release: res.data[0].releaseName
                    
                })
            }
            else{
                this.setState({
                    releases:[],
                    release: ''
                })
            }
        })
        .catch(err => {console.log(err)})

    }

     onChangeContent(e){
         this.setState({
            //  selectedDate: e.target.name,
             [e.target.name]: e.target.value
         })
         
     }  
         
      

    generateDateHeader(){
        let res=[]; 
        for (var index = 1; index < 16; index++) {
        res.push(<th className="alignment__Dates" key={index}>{index}</th>)
            
        }
        return res;
    }
    generateIndividualInput(){
        let res=[]; 
        for (var index = 1; index < 16; index++) {
        res.push(<td>
            <input type="text"
            // required
            name={"hoursworked"+index}
            id={"hoursworked"+index}
            className="form-control"
            value= "Bh"
            onChange={this.onChangeContent}
            />
        </td>)
            
        }
        return res;
    }
    onChangeHours(e){
        
        this.setState({
            hoursTested: [ e.target.name, e.target.value],
            
            
            
        })
        console.log(this.state.hoursTested)
        // hours.push({[event.target.id]: event.target.value})
        // console.log(hours)
        // this.setState( { event.target.id : event.target.value } );
        
    }
    
  
    onSubmit(e){
        e.preventDefault();
        for (var index = 1; index < 16; index++) {
            console.log(this.state.hoursworked+index)
        }
        
        
        const activity = {
            "year": this.state.year,
            "month": this.state.monthName,
            "timeslot": this.state.timeslot,
            "applicationName": this.state.application,
            "releaseName": this.state.release,
            "taskName": this.state.task,
            

        }

        

        
        // if(this.state.type){
            axios.post('http://localhost:5000/activities/add', activity)
            .then(res=> console.log(res.data));
            console.log(activity)
           

        // }
        // else{
            
        //     axios.post('http://localhost:5000/releases/update/'+this.state.editId, releaseInfo)
        //     .then(res=> console.log(res.data));
        //     console.log(releaseInfo)
    
        //     // window.location="/";
        //     this.setState({
        //         releaseName:'',
        //         submitButton: 'Add Release',
        //         // title: "Add Project Type",
        //         type: true
        //     })
        // }


        // window.location="/";
    }
    appendTab = () => {
        let { tabs } = this.state;
        tabs.push(tabs.length); // data.length is one more than actual length since array starts from 0.
        // Every time you call append row it adds new element to this array. 
        // You can also add objects here and use that to create row if you want.
        this.setState({tabs});
      };

      

    render() {
        return (
            <div>
                <h3>Create New Activity</h3>
                <form onSubmit={this.onSubmit}>

                <div className="form-group table-responsive">
                          
                    <table className="table">
                          <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Month</th>
                                    <th>Time Slot</th>
                                    <th>Action</th>
                                </tr>
                          </thead>
                          <tbody>
                                <tr>
                                    <td>
                                        <select ref="userInput" 
                                            required
                                            name="year"
                                            className="form-control"
                                            value={this.state.year}
                                            onChange={this.onChangeContent}>
                                            {
                                                this.state.years.map(function(year){
                                                        return <option
                                                    key={year}
                                                    value={year}>{year}</option>;
                                                })
                                            }
                                        </select>
                                    </td>   
                                    
                                    <td>
                                        <select ref="userInput" 
                                            required
                                            name="monthName"
                                            className="form-control"
                                            value={this.state.monthName}
                                            onChange={this.onChangeContent}>
                                            {
                                                this.state.monthNames.map(function(monthName){
                                                        return <option
                                                    key={monthName}
                                                    value={monthName}>{monthName}</option>;
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <select ref="userInput" 
                                            required
                                            name="timeslot"
                                            className="form-control"
                                            value={this.state.timeslot}
                                            onChange={this.onChangeContent}>
                                            {
                                                this.state.timeslots.map(function(timeslot){
                                                        return <option
                                                    key={timeslot}
                                                    value={timeslot}>{timeslot}</option>;
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td>
                                         <input type="submit" value="Create Activity" className="btn btn-primary" /> 
                                    </td>
                                  
                                </tr>
                          </tbody>
                    </table>
                    <div className="table-responsive">          
                        <table className="table">
                        <thead>
                            <tr className="alignment__Name__field">
                            <th className="alignment__Application">Application</th>
                            <th className="alignment__Application">Release</th>
                            <th className="alignment__Names">Task</th>
                            {this.generateDateHeader()}
                            <th className="alignment__Names">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="alignment__Name__field">
                            <td className="alignment__Application">
                                <select ref="userInput" 
                                required
                                name="application"
                                className="form-control"
                                value={this.state.application}
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
                            <td className="alignment__Application">
                                <select ref="userInput" 
                                required
                                name="release"
                                className="form-control"
                                value={this.state.release}
                                onChange={this.onChangeContent}>
                                {
                                    this.state.releases.map(function(release){
                                        return <option  
                                        key={release}
                                        value={release}>{release}</option>;
                                    })
                                }
                                </select>   
                            </td>
                            <td>
                                <select ref="userInput" 
                                required
                                name="task"
                                className="form-control"
                                value={this.state.task}
                                onChange={this.onChangeContent}>
                                {
                                    this.state.tasks.map(function(task){
                                        return <option
                                        key={task}
                                        value={task}>{task}</option>;
                                    })
                                }
                                </select>
                            </td>
                            {this.generateIndividualInput()}
                            <td><input type="submit" value=" + " className="btn btn-primary" /></td>

                            </tr>
                        </tbody>
                        </table>
                    </div>
                    {/* <Activity/> */}
                </div>
            </form> 
            </div>
        )
    }
}

