import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
// import logo from './images/logo.png'
import Navbar from './components/Navbar'
// import Blogs from './components/Blogs'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn : false,
      username: null
    }

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    //eslint-disable-next-line
    var instance = M.Sidenav.init(elem, {
        edge: "left",
        inDuration: 250
    });

    this.setState({loggedIn: localStorage.getItem('loggedIn'), username: localStorage.getItem('username')})
  }
  
  updateUser(userObject) {
    this.setState(userObject);
  }
  
  getUser() {
    axios.get('http://localhost:5000/isloggedin').then(response => {
      // console.log('Get user response: ')
      // console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        // console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }
  
  render() {
    return(
      <div>
        <nav className="teal">
          <div className="nav-wrapper">
            <NavLink to="/" className="brand-logo">SupplyChain<i className="navIcons material-icons">airport_shuttle</i></NavLink>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>  {this.state.loggedIn &&
                    <div style={{margin: "0 20px"}}>
                      <span className="new badge red userSpan" data-badge-caption="">
                        {this.state.username.substr(0, this.state.username.indexOf('@'))}
                      </span>
                    </div>
                    }
              </li>
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/">Home</NavLink></li>
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/about">About</NavLink></li>
              {this.state.loggedIn && 
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/create">Create</NavLink></li>
              }
              {this.state.loggedIn && 
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/logout">Logout</NavLink></li>
              }
              {!this.state.loggedIn &&
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/register">Register</NavLink></li>
              }
              {!this.state.loggedIn &&       
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/login">Login</NavLink></li>
              }
            </ul>
            <ul id="slide-out" className="sidenav">
            <li>  {this.state.loggedIn &&
                    <div style={{margin: "0 20px"}}>
                      <span className="new badge red userSpan" data-badge-caption="">
                        {this.state.username.substr(0, this.state.username.indexOf('@'))}
                      </span>
                    </div>
                    }
              </li>
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/">Home</NavLink></li>
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/about">About</NavLink></li>
              {this.state.loggedIn && 
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/create">Create</NavLink></li>
              }
              {this.state.loggedIn && 
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/logout">Logout</NavLink></li>
              }
              {!this.state.loggedIn &&
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/register">Register</NavLink></li>
              }
              {!this.state.loggedIn &&       
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/login">Login</NavLink></li>
              }
            </ul>
            <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          </div>
        </nav>
        <div><Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} username={this.state.username}/></div>
      </div>
    )
  }
}

export default App;
