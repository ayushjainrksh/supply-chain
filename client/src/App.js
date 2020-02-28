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
    this.getUser()
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
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/blogs">Blogs</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/logout">Logout</NavLink>
        <div><Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn}/></div>
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }
        {/* <Blogs/> */}
      </div>
    )
  }
}

export default App;
