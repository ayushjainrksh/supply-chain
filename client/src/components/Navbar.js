import React, { Component } from 'react'
import '../App.css'
import { Switch, Route, Redirect } from 'react-router-dom';
// import axios from 'axios'

import Register from './Register'
import Blogs from './Blogs'
import Login from './Login'
import Logout from './Logout'
import Create from './Create'
import View from './View'
import About from './About'

// const Homepage = () => (<Blogs/>);
const AboutPage = () => (<About/>);
const RegisterPage = () => (<Register/>);
// const BlogsPage = () => (<Blogs/>);
// const CreatePage = () => (<Create/>);


const Navbar = (props) => {
    return(
        <Switch>
            <Route path="/about" component={AboutPage}/>
            {props.username && 
            <Route path="/create" render={() =><Create username={props.username}/>}/>
            }
            <Route path="/register" component={RegisterPage}/>
            <Route path="/login" render={() => <Login loggedIn={props.loggedIn} updateUser={props.updateUser}/>}/>
            <Route path="/logout" render={() => <Logout updateUser={props.updateUser}/>}/>
            <Route path="/" render={() => <Blogs username={props.username}/>}/>
        </Switch>
    )};

export default Navbar;