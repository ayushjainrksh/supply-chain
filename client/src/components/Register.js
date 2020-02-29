import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'

class Register extends Component {
    constructor() {
        super();
        this.state =  {
            name : "",
            username : "",
            password : ""
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
        const {name, username, password} = this.state;
        return (
            <div className="register">
                <h4>Let's get started!</h4>
                <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="name" type="text" className="validate" key="name" name="name" value={name} onChange={this.handleChange}>
                                </input>
                                <label htmlFor="name">Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate" key="username" name="username" value={username} onChange={this.handleChange}>
                                </input>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate" key="password" name="password" value={password} onChange={this.handleChange}>
                                </input>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <button className="btn waves-effect waves-light" type="submit" name="action">Register
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
        {/* <form onSubmit={this.handleSubmit}>
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
        </form> */}
    }
}

export default Register;