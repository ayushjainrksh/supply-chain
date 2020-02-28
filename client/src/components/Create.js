import React, { Component } from 'react'
import axios from 'axios'
  
class Blogs extends Component {
    constructor() {
      super();
  
      this.state = {
        title: "",
        description: ""
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleChange = e => {
      this.setState({[e.target.name] : e.target.value})
    }
  
    handleSubmit = e => {
        e.preventDefault();
        const blog = {
            title: this.state.title,
            description: this.state.description,
            username: this.props.username
        }
        console.log(blog);
  
        axios.post('http://localhost:5000/', null, {params: blog})
        .then(res => {
            // console.log(res);
            console.log(res.data);
        })
    }
    
    render() {
      const {title, description} = this.state;
      return(        
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input id="title" key="title" type="text" name="title" value={title} onChange={this.handleChange} required/>
              <label for="title">Title</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="description" key="description" type="text" name="description" value={description} onChange={this.handleChange} required/>
              <label for="descrption">Description</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i class="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      )
    }
  }
  
export default Blogs;
