// import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
// import axios from 'axios';

// const ReleaseType = props =>(
//     <tr>
//         <td>{props.releasetype.releaseTypeName}</td>
//         {/* <td>{props.exercise.description}</td>
//         <td>{props.exercise.duration}</td>
//         <td>{props.exercise.date.substring(0,10)}</td> */}
//         <td>
//             <Link to={"/edit/"+props.releasetype._id}>edit</Link> | <a href="#" onClick={()=>{props.deleteProject(props.releasetype._id)}}>delete</a>
//         </td>
//     </tr>
// )

// export default class ReleaseTypesList extends Component {
//     constructor(props){
//         super(props);

//         this.deleteReleaseType = this.deleteReleaseTypes.bind(this);
//         this.state = {releasetypes: []};
//     }

//     componentDidMount(){
//         axios.get('http://localhost:5000/release-type/')
//         .then(res =>{
//             this.setState({
//                 releasetypes:res.data
//             })
//         })
//         .catch(err => {console.log(err)})

//     }

//     deleteReleaseTypes(id){
//         axios.delete('http://localhost:5000/release-type/'+id)
//         .then(res=>console.log(res.data));
//         this.setState({
//             releasetypes: this.state.releasetypes.filter(el => el._id !== id)
//         })
//     }

//     releasetypesList(){
//         return this.state.releasetypes.map(currentreleasetype =>{
//             return <ReleaseType releasetype={currentreleasetype} deleteReleaseType={this.deleteReleaseTypes} key={currentreleasetype._id}/>;
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <h3>Logged Release Types</h3>
//                 <table className="table">
//                     <thead className="thead-light">
//                         <tr>
//                             <th>Release Type Name</th>
                            
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.releasetypesList()}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }

