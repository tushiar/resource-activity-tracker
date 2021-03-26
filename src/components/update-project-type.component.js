import React, { Component } from 'react'
import axios from 'axios';
export default class UpdateReleaseType extends Component {
    constructor(props){
        super(props);

        this.onChangeProjectTypeName = this.onChangeProjectTypeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            projectName : '',
        }
    }

    onChangeProjectTypeName(e){
        this.setState({
            projectName: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const projectType = {
            "projectName": this.state.projectName,
        }

        console.log(projectType)

        axios.post('http://localhost:5000/project-type/add', projectType)
        .then(res=> console.log(res.data));

        // window.location="/";
        this.setState({
            projectName:''
        })
    }
    render() {
        return (
            <div>
                <h3>Create New Project Type</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Project Type Name: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.projectName}
                        onChange={this.onChangeProjectTypeName}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                        value="Add Project"
                        className="btn btn-primary"
                        />
                    </div>
                </form> 
            </div>
        )
    }
}

