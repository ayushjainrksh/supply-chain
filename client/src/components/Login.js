import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
    constructor() {
        super();
        this.state =  {
            username : "",
            password : "",
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
            if(res.status == 200)
            {
                console.log("Logged In");
                console.log(this.props);
                console.log("LOGGG  : " + this.props.loggedIn);
                console.log("USDF : " + res.data);
                this.props.updateUser({
                    loggedIn: true,
                    username: res.data
                })
            }
            else
            {
                console.log("Failed to log in");
            }
            console.log(res.data);
        })
    }

    render() {
        const {username, password, isloggedin} = this.state;
        console.log(isloggedin);
        if(isloggedin=="true"){
            return(
                <div>Hello</div>
            )
        }
        else {
            return (
                <div className="login">
                    <h4>Sign in</h4>
                    <div className="row">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" type="email" class="validate" key="username" name="username" value={username} onChange={this.handleChange} required>
                                    </input>
                                    <label for="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" type="password" class="validate" key="password" name="password" value={password} onChange={this.handleChange} required>
                                        </input>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <button class="btn waves-effect waves-light" type="submit" name="action">Login
                                        <i class="material-icons right">send</i>
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