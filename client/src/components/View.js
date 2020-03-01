import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'

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

const CommentItem = (props) => {
    return(
        <div className="card-panel comment">
            <strong>{props.author.substr(0, props.author.indexOf('@'))}</strong>
            <span id="comTime">
            <Date {...props}/>
            {/* {props.time.substr(props.time.indexOf('T')+1,props.time.indexOf('.')-props.time.indexOf('T')-1)}<span> </span>
            {props.time.substr(0, props.time.indexOf('T'))} */}
            </span>
            <div id="comText">{props.text}</div>
        </div>
    )
}

class View extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            title: "",
            description: "",
            image: "",
            author: "",
            time: "",
            comments: [{
                text: "",
                time: "",
                author: ""
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
        const comment = {
            text: this.state.text,
            username: this.props.username
        }
        console.log(comment);

        axios.post('https://supplyc.herokuapp.com/blogs/'+this.props.match.params.id, null, {params: comment})
        .then(res => {
            // console.log(res);
            this.setState({text: ""})
            this.componentDidMount();
            // console.log(res.data);
        })
    }
      
    componentDidMount() {
        axios.get('https://supplyc.herokuapp.com/blogs/'+this.props.match.params.id)
      .then(res => {
        const data = res.data;
        // console.log(data);
        const comments = data.comments.map((com, ind) => {
            return {
                text: com.text,
                time: com.createdAt,
                author: com.author.username
            }
        })
        const blog = {
            title: data.title,
            description: data.description,
            image: data.image,
            author: data.author.username,
            time: data.createdAt,
            _id: data._id
        }
        this.setState({...blog, comments})
      })
    }
    
    render() {
        const comments = this.state.comments.map((com, index) => (
            <CommentItem key={index} text={com.text} time={com.time} author={com.author}/>
            ))
        const {text} = this.state;
        return(
            <div>
                <div className="row">
                    <div className="col s12 m8">
                        <div className="card large viewCard">
                            <div className="card-image viewCardImage">
                                <img alt="Blog" src={this.state.image}/>
                            </div>
                                <div className="cardTitle">
                                    <span className="card-title">{this.state.title}</span>
                                </div>
                                <div className="cardAuthor">
                                    <div><strong>{this.state.author.substr(0, this.state.author.indexOf('@'))}</strong></div>
                                    <div className="cardTime">
                                        <Date {...this.state}/>
                                     </div>
                                </div>
                            <div className="card-content">
                                {this.state.description}
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <div className="row">
                            <div className="col s12">
                                <h5>Comments</h5>
                            </div>
                            <form className="col s12" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s8">
                                        <input id="text" key="text" type="text" name="text" value={text} onChange={this.handleChange} required/>
                                        <label htmlFor="text">Add a comment</label>
                                    </div>
                                    <div className="input-field col s4 right">
                                        {this.props.username != null ?
                                            <button style={{"marginTop":"10px"}} className="btn-small waves-effect waves-light" type="submit" name="action">
                                                <i className="material-icons">send</i>
                                            </button>
                                            :
                                            <div>
                                            <button style={{"marginTop":"10px"}} className="btn-small waves-effect waves-light" type="submit" name="action" disabled>
                                                <i className="material-icons">send</i>
                                            </button>
                                            <div className="red-text">
                                                Login to comment on this post.
                                            </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </form>
                            <div className="col s12">
                                {comments}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default View;