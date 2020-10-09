import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
        render() {
        return (
            <div>
                <section>
                    <Link to='/dashboard'>Home</Link>
                </section>
                <section>
                    <Link to='/new'>New Post</Link>
                </section>
                <section>
                    <Link to='/'>Logout</Link>
                </section>
            </div>
        )
    }
}
