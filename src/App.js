import React, { Component }from 'react';
import './App.css';
import routes from './routes';
import Nav from './Components/Nav/Nav';

export default class App extends Component {
  // navRender = () => {
  //   let location = useLocation();
  //   console.log(this.props.pathname);
  // }
  render() {
    return (
      <div>
        <Nav />
      {routes}
      {/* <button onClick={this.navRender}>Test</button> */}
      </div>
    )
  }
}
