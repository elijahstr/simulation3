import React, { Component } from 'react'
import axios from 'axios';

export default class Post extends Component {
    constructor() {
        super()
        this.state = {
            img: "",
            profile_pic: "",
            title: "",
            username: "",
            content: "",
            isEditing: true
        }
    }
    getPost = () => {
        axios.get(`/api/one_post/${this.props.match.params.postid}`)
        .then(res => {
            let {img, profile_pic, title, username, content} = res.data[0];
            this.setState({img, profile_pic, title, username, content})
        })
        .catch(err=> console.log(err));
    }

    editContent = (e) =>{
        this.setState({content: e.target.value})
    }

    isEditingFN = () =>{
        this.setState({isEditing: false})
    }

    submitChange = () => {
        axios.put(`/api/edit_post/${this.props.match.params.postid}`, {content: this.state.content})
        .then(() =>{
            this.setState({isEditing: true})
        })
    }

    componentDidMount(){
        this.getPost();
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <img src={this.state.img} alt={this.state.title}></img>
                
                {this.state.isEditing?
                <div>
                    <p>{this.state.content}</p>
                    <button onClick={()=>this.isEditingFN()}>Edit Content</button>
                </div>
                :
                <div>
                    <input value={this.state.content} onChange={this.editContent}></input>
                    <button onClick={()=>this.submitChange()}>Submit Changes</button>
                </div>
                }

                <p>{this.state.username}</p>
            </div>
        )
    }
}
