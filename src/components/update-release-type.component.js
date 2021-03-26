import React, { Component } from 'react'
import axios from 'axios';
export default class UpdateReleaseType extends Component {
    constructor(props){
        super(props);

        this.onChangereleaseTypeName = this.onChangereleaseTypeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            releaseTypeName : '',
        }
    }

    onChangereleaseTypeName(e){
        this.setState({
            releaseTypeName: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const relType = {
            "relTypeName": this.state.releaseTypeName,
        }

        console.log(relType)

        axios.post('http://localhost:5000/release-type/add', relType)
        .then(res=> console.log(res.data));

        // window.location="/";
        this.setState({
            releaseTypeName:''
        })
    }
    render() {
        return (
            <div>
                <h3>Create New Release Type</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Release Type Name: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.releaseTypeName}
                        onChange={this.onChangereleaseTypeName}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                        value="Add Release"
                        className="btn btn-primary"
                        />
                    </div>
                </form> 
            </div>
        )
    }
}

