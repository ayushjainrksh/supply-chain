import React, { Component } from 'react'
import axios from 'axios'
import { NavLink, Route, Switch } from 'react-router-dom';

import View from "./View"

const BlogItem = (props) => {
    const url = "/blogs/"+props._id;
    // console.log(url)
    return(
        <div className="col s12 m4">
          <div className="card small">
            <div className="card-image">
              <img alt="blog" src={props.image}></img>
              <span className="card-title textColor">{props.title}</span>
            </div>
            <div className="card-content">
              <p>{props.description}</p>
            </div>
            <div className="card-action">
              <NavLink to={url} className="btn btn-small waves-effect waves-light">View post</NavLink>
              <div className="cardTime right">
                <div><strong>{props.author}</strong></div>
                {props.time.substr(props.time.indexOf('T')+1,props.time.indexOf('.')-props.time.indexOf('T')-1)}<span> </span>
                {props.time.substr(0, props.time.indexOf('T'))}
              </div>
            </div>
          </div>
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
          image: "",
          author: "",
          time: "",
          id: ""
        }]
      }
  
    }

    componentDidMount() {

      axios.get('http://localhost:5000/blogs')
      .then(res => {
        const data = res.data;
        // console.log(data);
        const blogs = data.map((blg, ind) => {
          return {
            title: blg.title,
            description: blg.description,
            image: blg.image,
            author: blg.author.username,
            time: blg.createdAt,
            _id: blg._id
          }
        })
        this.setState({blogs: blogs})
      })
    }
  
    render() {
      const blogs = this.state.blogs.map((blg, index) => (
        <BlogItem key={index} title={blg.title} description={blg.description} image={blg.image} author={blg.author} time={blg.time} _id={blg._id}/>
        ))
      return(
        <div className="row">
          <Switch>
            <Route path='/blogs/:id' render = {(props) => <View {...props} username={this.props.username}/>}>
            </Route>
            <Route path={'/'}>
              {blogs}
            </Route>
          </Switch>

        </div>
        )
    }
  }
  
export default Blogs;