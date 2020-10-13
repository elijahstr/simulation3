import axios from 'axios';
import React, { Component } from 'react'
import Post from '../Post/Post';
import {connect} from 'react-redux';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            search: "",
            myPosts: true,
            posts: []
        }
    }

    eSearch = (e) => {
        this.setState({search: e.target.value})
    }

    checkFN = () => {
        if(this.state.myPosts===true){
            this.setState({myPosts: false})
        }
        else{
            this.setState({myPosts: true})
        }
    }

    getAllPosts = () => {
        axios.get(`/auth/posts/${this.props.user.id}?userposts=${this.state.myPosts}&search=${this.state.search}`)
        .then(res => {
            this.setState({posts: res.data})
            this.setState({search: ""})
        })
    }

    resetFN = () => {
      this.setState({search: ""})
      this.getAllPosts();
    }

    componentDidMount(){
        this.getAllPosts();
        if(!this.props.user.id){
            this.props.history.push('/');
        }
    }

    render() {
        const mappedPosts = this.state.posts.map((data, i) =>(
            <Post key={i}
            post={data}
            title={data.title}
            profile_pic={data.profile_pic}
            username={data.username}
            />
        ))
        return (
            <div>
                <input placeholder="Search" value={this.state.search} onChange={this.eSearch}></input>
                <button onClick={() => this.getAllPosts()}>Search</button>
                <button onClick={() => this.resetFN()}>Reset</button>
                <section>
                    <input type="checkbox" 
                    id="myPosts" 
                    value={this.state.myPosts} 
                    defaultChecked
                    onClick={this.checkFN}/>
                    <label htmlFor="myPosts">My Posts</label>
                </section>

                {mappedPosts}
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Dashboard);
