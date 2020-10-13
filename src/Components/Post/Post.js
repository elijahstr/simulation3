import React, { Component } from 'react'

export default class Post extends Component {
    render() {
        return (
            <div>
                <p>{this.props.title}</p>
                <p>Created by: {this.props.username}</p>
                <img src={this.props.profile_pic} alt={this.props.username}/>
            </div>
        )
    }
}
