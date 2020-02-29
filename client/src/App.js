import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom'

import Navbar from './components/Navbar'
import Blogs from './components/Blogs'

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
    // this.getUser()
  }
  
  updateUser(userObject) {
    // return "hello"
    console.log(userObject)
    this.setState(userObject)
  }
  
  getUser() {
    axios.get('http://localhost:5000/isloggedin').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
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
            <a href="#" className="brand-logo">SupplyChain</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>  {this.state.loggedIn &&
                    <div>Welcome, {this.state.username}</div>
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
          </div>
        </nav>
        <div><Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} username={this.state.username}/></div>
      </div>
    )
  }
}

export default App;
