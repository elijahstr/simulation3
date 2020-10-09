import axios from 'axios'
import React, { Component } from 'react'

export default class Auth extends Component {
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
        .then(()=>{
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    login = () => {
        axios.post('/auth/login', {username: this.state.username, password: this.state.password})
        .then(() => {
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <input placeholder="Username" onChange={this.eUsername} value={this.state.username}></input>
                <input placeholder="Password" onChange={this.ePassword} value={this.state.password}></input>
                <button onClick={() => this.login()}>Login</button>
                <button onClick={() => this.registerUser()}>Register</button>
            </div>
        )
    }
}
