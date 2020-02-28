import React, { Component } from 'react'
import axios from 'axios'

const BlogItem = (props) => {
    return(
      <div className = "inner-div">
        <div className = "title">Title: {props.title}</div>
        <div className = "description">Description: {props.description}</div>
        <div className = "author">Author: {props.author}</div>
        <div className = "time">Posted At: {props.time}</div>
        <br></br>
      </div>
    );
}
  
class Blogs extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        blogs: [{
          title: "",
          description: "",
          author: "",
          time: ""
        }]
      }
  
    }

    componentDidMount() {

      axios.get('http://localhost:5000/blogs')
      .then(res => {
        const data = res.data;
        console.log(data);
        const blogs = data.map((blg, ind) => {
          return {
            title: blg.title,
            description: blg.description,
            author: blg.author.username,
            time: blg.createdAt
          }
        })
        this.setState({blogs: blogs})
      })
    }
  
    render() {
      const blogs = this.state.blogs.map((blg, index) => (
        <BlogItem key={index} title={blg.title} description={blg.description} author={blg.author} time={blg.time} />
      ))

      return(
        <div>
          {blogs}
        </div>
      )
    }
  }
  
export default Blogs;