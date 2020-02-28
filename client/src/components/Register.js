import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {
    constructor() {
        super();
        this.state =  {
            name : "",
            username : "",
            password : "",
            isRegistered: Boolean
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const user = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password
        }
        console.log(user);

    axios.post('http://localhost:5000/register', null, {params: user})
    .then(res => {
        if(res.status == 200)
        {
            console.log("Account created");
            this.setState({isRegistered: true})
        }
        console.log("STATUS : " + res.status);
        console.log(res);
        console.log(res.data);
    })
    }

    render() {
        const {name, username, password, isRegistered} = this.state;
        // if(isRegistered) {
        //     return(
        //         <div>Success</div>
        //     )
        // }
        // else {
            return(
                <form onSubmit={this.handleSubmit}>
                <label>Name
                    <input key="name" type="text" name="name" value={name} onChange={this.handleChange}/>
                </label>
                <label>Email
                    <input key="username" type="email" name="username" value={username} onChange={this.handleChange}/>
                </label>
                <label>Password
                    <input key="password" type="password" name="password" value={password} onChange={this.handleChange}/>
                </label>
                <button type="submit">Sign Up</button>
            </form>
            )
        // }
    }
}

export default Register;