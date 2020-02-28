import React, { Component } from 'react'
import axios from 'axios'

const BlogItem = (props) => {
    return(
      // <div className="row">
        <div className="col s12 m4">
          <div className="card small">
            <div className="card-image">
              <img src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"></img>
              <span className="card-title">{props.title}</span>
            </div>
            <div className="card-content">
              <p>{props.description}</p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      // </div>
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
        <div className="row">
          {blogs}
        </div>
      )
    }
  }
  
export default Blogs;