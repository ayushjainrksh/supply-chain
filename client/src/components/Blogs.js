import React, { Component } from 'react'
import axios from 'axios'
import { NavLink, Route, Switch } from 'react-router-dom';

import View from "./View"

const Date = (props) => {
  let time = props.time.substr(props.time.indexOf('T')+1,props.time.indexOf('.')-props.time.indexOf('T')-1)
  let date = props.time.substr(0, props.time.indexOf('T'))
  
  if(parseInt(time.substr(0,2)) < 12) 
    time = time.substr(0,5)+"AM"
  else
    time = parseInt(time.substr(0,2))-12+time.substr(2,3)+"PM"

  let dateArr = date.split("-")
  let monthArr = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  let month = monthArr[parseInt(dateArr[1])-1]
  return <span>{month +" "+ parseInt(dateArr[2])+", "+ dateArr[0]}, {time}</span>
}

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
            <div className="card-content truncate">
              {props.description}
            </div>
            <div className="card-action">
              <NavLink to={url} className="btn btn-small waves-effect waves-light">View post</NavLink>
              <div className="cardTime right">
                <div><strong>{props.author.substr(0, props.author.indexOf('@'))}</strong></div>
                <Date {...props}/>
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

      axios.get('https://supplyc.herokuapp.com/blogs')
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