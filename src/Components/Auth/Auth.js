import axios from 'axios'
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

class Auth extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
    }

    eUsername = (e) => {
        this.setState({username: e.target.value})
    }

    ePassword = (e) => {
        this.setState({password: e.target.value})
    }

    registerUser = () => {
        axios.post('/auth/register', {username: this.state.username, password: this.state.password, profile_pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"})
        .then((res)=>{
            this.props.getUser(res.data);
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    login = () => {
        axios.post('/auth/login', {username: this.state.username, password: this.state.password})
        .then((res) => {
            this.props.getUser(res.data);
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <input placeholder="Username" onChange={this.eUsername} value={this.state.username}></input>
                <input placeholder="Password" onChange={this.ePassword} value={this.state.password} type="password"></input>
                <button onClick={() => this.login()}>Login</button>
                <button onClick={() => this.registerUser()}>Register</button>
            </div>
        )
    }
}


export default connect(null, {getUser})(Auth);
