import React from 'react'
import '../App.css'
import { Switch, Route } from 'react-router-dom';

import Register from './Register'
import Blogs from './Blogs'
import Login from './Login'
import Logout from './Logout'
import Create from './Create'
import About from './About'

const AboutPage = () => (<About/>);
const RegisterPage = () => (<Register/>);


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
    )
};

export default Navbar;