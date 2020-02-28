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
        <div>
          <form onSubmit={this.handleSubmit}>
              <label>Title:
                <input key="title" type="text" name="title" value={title} onChange={this.handleChange}/>
              </label>
              <label>Description:
                <input key="description" type="text" name="description" value={description} onChange={this.handleChange}/>
              </label>
              <button type="submit">Submit</button>
          </form>
        </div>
      )
    }
  }
  
export default Blogs;