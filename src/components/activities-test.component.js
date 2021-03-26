import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./activities.component.css";
import update from 'react-addons-update';   


const Row = props =>(

    <tr className="alignment__Name__field">
        <td>{props.row.applicationName}</td>
        <td>{props.row.releaseName}</td>
        <td>{props.row.taskName}</td>
        
        {props.hours.map(hour =>{

            return <td id = {hour.id}>{hour.value}</td>
        })}
        <td>
        <a href="#" onClick={()=>{props.editRow(props.row._id)}}>edit</a> | <a href="#" onClick={()=>{props.deleteRow(props.row._id)}}>delete</a>
        </td>
    </tr>
)
 

export default class Activities extends Component {
    constructor(props){
        super(props);

        
        this.generateDateHeader = this.generateDateHeader.bind(this);
        this.generateIndividualInput = this.generateIndividualInput.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeContentTest = this.onChangeContentTest.bind(this);
        this.onChangeHours = this.onChangeHours.bind(this);
        this.getUnique = this.getUnique.bind(this);
        this.rowslist = this.rowslist.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.editRow = this.editRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.onChangeAppln = this.onChangeAppln.bind(this);
        this.setHours = this.setHours.bind(this);
        this.sortHours = this.sortHours.bind(this);
               
        
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
            editId:'',
            selectedDate:'',
            type: true,
            years:["2018", "2019", "2020"],
            monthNames:[ "January", "February", "March", "April", "May", "June",
             "July", "August", "September", "October", "November", "December" ],
            timeslots:["First Half", "Second Half"],
            // enddate: new Date(),
            applications: [],
            tasks:[],
            releases:[],
            tabs:[],
            hoursTested:[{id: '', value:''}],
            abc:[],
            rows:[]
            
        }
        // const testhours = () =>{
        //     this.state ={
        //         abc: ''
        //     }
        // }
           
        
        
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
        
        .catch(err => {console.log(err)})
        axios.get('http://localhost:5000/tasks/')
        .then(res =>{
            this.setState({
                
                tasks: res.data.map(task => task.taskName),
                task: res.data[0].taskName
                
            })
        })
        .catch(err => {console.log(err)})

        this.generateIndividualInput()
        // axios.get('http://localhost:5000/activities/')
        // .then(res =>{
        //     if(res.data.length > 0){
        //         this.setState({
        //             rows: res.data
                    
        //         })
        //     }
        // })

    }
    componentDidUpdate(){
        // axios.get('http://localhost:5000/releases/' +this.state.application)
        // .then(res =>{
        //     if(res.data.length > 0){
        //         this.setState({
                
        //             releases: res.data.map(release => release.releaseName),
        //             release: res.data[0].releaseName
                    
        //         })
        //     }
        //     else{
        //         this.setState({
        //             releases:[],
        //             release: ''
        //         })
        //     }
        // })
        axios.get('http://localhost:5000/activities/')
        .then(res =>{
            if(res.data.length > 0){
                this.setState({
                    rows: res.data
                    
                })
            }
        })
        
    }
    editRow(id){
        axios.get('http://localhost:5000/activities/'+id)
        .then(res =>{
            this.setState({
                year: res.data.year,
                monthName: res.data.month,
                timeslot: res.data.timeslot,
                application: res.data.applicationName,
                release: res.data.releaseName,
                task: res.data.taskName,
            // "resourceType": this.state.resourceType,
                release: res.data.releaseName,
                hoursTested: this.sortHours(res.data.hours),
                submitButton: 'Update Release',
                type: false,
                editId: id,
                
                // title: 'Update Project Type'
            })
        })
        .catch(function (error){
            console.log(error);
        })
        // this.setHours()
        
    }
    deleteRow(id){
        axios.delete('http://localhost:5000/releases/'+id)
        .then(res=>console.log(res.data));
        this.setState({
            releases: this.state.releases.filter(el => el._id !== id)
        })
    }

     onChangeContent(e){
         this.setState({
            //  selectedDate: e.target.name,
             [e.target.name]: e.target.value
         })
         
     } 
     
     onChangeContentTest(e){
        this.setState({ 
        hoursTested: [{id:e.target.name, value: e.target.value},...this.state.hoursTested]
        });
    // console.log(this.state.abc)
        
    }  
   generateDateHeader(){
        let res=[]; 
        for (var index = 1; index < 16; index++) {
        res.push(<th className="alignment__Dates" key={index}>{index}</th>)
            
        }
        return res;
    }
    generateIndividualInput(){

        const a = [];
        for (let i = 1; i < 16; i++) {
          a.push(i);
          
          
        }
        this.setState({ 
            abc: a
          });
        
    }
    rowslist(){
        return this.state.rows.map(currentrow =>{
            const hours= this.sortHours(currentrow.hours)
            return <Row row={currentrow} hours= {hours} editRow={this.editRow} deleteRow={this.deleteRow} key={currentrow._id}/>;
        })
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
    onChangeAppln(e){
        this.setState({
            //  selectedDate: e.target.name,
             [e.target.name]: e.target.value
         })
         axios.get('http://localhost:5000/releases/' +e.target.value)
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
                    // release: ''
                })
            }
        })
        .catch(err => {console.log(err)})

    }
    getUnique(arr, index) {

        const unique = arr
             .map(e => e[index])
      
             // store the keys of the unique objects
             .map((e, i, final) => final.indexOf(e) === i && i)
      
             // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);      
      
         return unique;
      }
      
    sortHours(hoursTest){
        const hours = Array.from(new Set(this.getUnique(hoursTest, 'id')));
        
        var reA = /[^a-zA-Z]/g;
        var reN = /[^0-9]/g;
        hours.sort(function sortAlphaNum(a, b) {
            var aA = a.id.replace(reA, "");
            var bA = b.id.replace(reA, "");
            if (aA === bA) {
              var aN = parseInt(a.id.replace(reN, ""), 10);
              var bN = parseInt(b.id.replace(reN, ""), 10);
              return aN === bN ? 0 : aN > bN ? 1 : -1;
            } else {
              return aA > bA ? 1 : -1;
            }
          });
        
        // console.log(hours)
        return hours;
    }
  
    onSubmit(e){
        e.preventDefault();
        // console.log(this.getUnique(this.state.hoursTested, 'id'))
        const hours = this.sortHours(this.state.hoursTested);
        var hoursSorted = hours.shift()
        const activity = {
            "year": this.state.year,
            "month": this.state.monthName,
            "timeslot": this.state.timeslot,
            "applicationName": this.state.application,
            "releaseName": this.state.release,
            "taskName": this.state.task,
            "hours": hours
            

        }

        if(this.state.type){
            axios.post('http://localhost:5000/activities/add', activity)
            .then(res=> console.log(res.data));
            console.log(activity)
            this.state.hoursTested.map(hour =>{
                this.setState({
                    [hour.id]: ''
                })
            })
        }
        else{
            axios.post('http://localhost:5000/activities/update/'+this.state.editId, activity)
            .then(res=> console.log(res.data));
            console.log(activity)
    
            // window.location="/";
            this.state.hoursTested.map(hour =>{
                this.setState({
                    [hour.value]: ''
                })
            })
            this.setState({
                // releaseName:'',
                submitButton: 'Add Release',
                // title: "Add Project Type",
                
                type: true
            })
        
        }

        
        
            
        
       
    }
    setHours(){
       
        if (this.state.editId==='') {
            console.log("hello fucker")

            return(this.state.abc.map(item => <td>
                
                <input type="text"
                // required
                name={`hoursworked-${item}`}
                id={`hoursworked-${item}`}
                className="form-control"
                // value= ''
                onChange={this.onChangeContentTest}
                />
                </td>))
        
        } else {
            console.log(this.state.editId)
            return(
                this.state.hoursTested.map(item => <td>
                    <input type="text"
                    // required
                    name={item.id}
                    id={item.id}
                    className="form-control"
                    value={item.value}
                    onChange={this.onChangeContentTest}
                    />
                </td>)  
            )
            
        }
        
    }

      

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
                                onChange={this.onChangeAppln}>
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
                            {this.setHours()}
                            <td><input type="submit" value=" + " className="btn btn-primary" /></td>

                            </tr>
                            {this.rowslist()}
                            
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

