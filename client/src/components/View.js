import React, { Component } from 'react'
import axios from 'axios'

const CommentItem = (props) => {
    return(
        <div>
            Comments:
            <div>{props.text}</div>
            <div>{props.time}</div>
            <div>{props.author}</div>
        </div>
    )
}

class View extends Component {
    constructor() {
        super();
        this.state = {
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
    }

    componentDidMount() {
        console.log(this.props);
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
        return(
            <div>
                <div>{this.state.title}</div>
                <div>{this.state.description}</div>
                <div>{this.state.author}</div>
                <div>{this.state.time}</div>
                {comments}
            </div>
        )
    }
}

export default View;