import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state =  {
            username : "",
            password : "",
            flag: Number
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
            // name: this.state.name,
            username: this.state.username,
            password: this.state.password
        }
        console.log(user);

    axios.post('http://localhost:5000/login', null, {
        params: user,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
        })
    .then(res => {
            if(res.status === 200)
            {
                this.props.updateUser({
                    loggedIn: true,
                    username: res.data
                })
                localStorage.setItem("loggedIn", true)
                localStorage.setItem("username", res.data);
            }
            else
            {
                this.setState({flag:2})
                console.log("Failed to log in");
            }
        })
        .catch((err) => {
            console.log("Failed to log in");
            console.log(err);
            this.setState({flag:2})
        })
    }

    render() {
        const {username, password, flag} = this.state;
        if(this.props.loggedIn === true){
            return <Redirect to={{ pathname : "/"}}></Redirect>;
        }
        else {
            return (
                <div className="login">
                    <h4>Sign in</h4>
                    <div className="row">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" type="email" className="validate" key="username" name="username" value={username} onChange={this.handleChange} required>
                                    </input>
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" type="password" className="validate" key="password" name="password" value={password} onChange={this.handleChange} required>
                                        </input>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            {flag === 2 &&
                                <div className="red-text">Invalid Credentials</div>
                            }
                            <div className="row">
                                <div className="input-field col s12">
                                    <button className="btn waves-effect waves-light" type="submit" name="action">Login
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}
export default Login;