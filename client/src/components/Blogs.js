import React, { Component } from 'react'
import axios from 'axios'

const BlogItem = props => {
    return(
      <div className = "inner-div">
        <div className = "title">Title: {props.title}</div>
        <div className = "description">Description: {props.description}</div>
      </div>
    );
}
  
class Blogs extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        title: "",
        description: "", 
        blogs: [{
          title: "",
          description: ""
        }]
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
        description: this.state.description
      }
      console.log(blog);
  
      axios.post('http://localhost:5000/', null, {params: blog})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
  
    componentDidMount() {

      axios.get('http://localhost:5000/blogs')
      .then(res => {
        const data = res.data;
        // const Hi = data['Hi']
        console.log(data);
  
        const blogs = data.map((blg, ind) => {
          return {
            title: blg.title,
            description: blg.description
          }
        })
        this.setState({blogs: blogs})
      })
    }
  
    render() {
      const {title, description} = this.state;
      const blogs = this.state.blogs.map((blg, index) => (
        <BlogItem key={index} title={blg.title} description={blg.description} />
      ))

      return(
        <div>
          <form onSubmit={this.handleSubmit}>
              <input key="title" type="text" name="title" value={title} onChange={this.handleChange}/>
              <input key="description" type="text" name="description" value={description} onChange={this.handleChange}/>
              <button type="submit">Submit</button>
          </form>
          {blogs}
        </div>
      )
    }
  }
  
export default Blogs;