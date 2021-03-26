// import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
// import axios from 'axios';

// const Application = props =>(
//     <tr>
//         <td>{props.application.applicationName}</td>
//         {/* <td>{props.exercise.description}</td>
//         <td>{props.exercise.duration}</td>
//         <td>{props.exercise.date.substring(0,10)}</td> */}
//         <td>
//             <Link to={"/edit/"+props.application._id}>edit</Link> | <a href="#" onClick={()=>{props.deleteApplication(props.application._id)}}>delete</a>
//         </td>
//     </tr>
// )

// export default class ApplicationList extends Component {
//     constructor(props){
//         super(props);

//         this.deleteApplication = this.deleteApplications.bind(this);
//         this.state = {applications: []};
//     }

//     componentDidMount(){
//         axios.get('http://localhost:5000/applications/')
//         .then(res =>{
//             this.setState({
//                 applications:res.data
//             })
//         })
//         .catch(err => {console.log(err)})

//     }

//     deleteApplications(id){
//         axios.delete('http://localhost:5000/applications/'+id)
//         .then(res=>console.log(res.data));
//         this.setState({
//             applications: this.state.applications.filter(el => el._id !== id)
//         })
        
//     }

//     applicationsList(){
//         return this.state.applications.map(currentapplication =>{
//             return <Application application={currentapplication} deleteApplication={this.deleteApplications} key={currentapplication._id}/>;
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <h3>Logged Applications</h3>
//                 <table className="table">
//                     <thead className="thead-light">
//                         <tr>
//                             <th>Application Name</th>
                            
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.applicationsList()}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }

