import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'

const CommentItem = (props) => {
    return(
        <div className="card-panel comment">
            <strong>{props.author}</strong>  <span id="comTime">{props.time}</span>
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

        axios.post('http://localhost:5000/blogs/'+this.props.match.params.id, null, {params: comment})
        .then(res => {
            // console.log(res);
            console.log(res.data);
        })
    }
      
    componentDidMount() {
        axios.get('http://localhost:5000/blogs/'+this.props.match.params.id)
      .then(res => {
        const data = res.data;
        console.log(data);
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
        // console.log(commentText);
        return(
            <div>
                <div className="row">
                    <div className="col s12 m8">
                        <div className="card large">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                            </div>
                            <div className="row">
                                <div className="cardTitle">
                                    <span className="card-title">{this.state.title}</span>
                                </div>
                                <div className="cardAuthor">
                                    <div><strong>{this.state.author}</strong></div>
                                    <div className="cardTime">{this.state.time}</div>
                                </div>
                            </div>
                            <div className="card-content">
                                <p>{this.state.description}</p>
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
                                        <button style={{"marginTop":"10px"}} className="btn-small waves-effect waves-light" type="submit" name="action">
                                            <i className="material-icons">send</i>
                                        </button>
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