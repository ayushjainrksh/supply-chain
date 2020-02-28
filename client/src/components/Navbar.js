import React, { Component } from 'react'
import '../App.css'
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios'

import Register from './Register'
import Blogs from './Blogs'
import Login from './Login'
import Logout from './Logout'
import Create from './Create'

const Homepage = () => (<Blogs/>);
const About = () => (<div>About</div>);
const RegisterPage = () => (<Register/>);
// const BlogsPage = () => (<Blogs/>);
const CreatePage = () => (<Create/>);


const Navbar = (props) => {
    return(
        <Switch>
            <Route path="/about" component={About}/>
            <Route path="/create" render={() =><Create username={props.username}/>}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/login" render={() => <Login loggedIn={props.loggedIn} updateUser={props.updateUser}/>}/>
            <Route path="/logout" render={() => <Logout updateUser={props.updateUser}/>}/>
            <Route path="/" component={Homepage}/>
        </Switch>
    )};

export default Navbar;