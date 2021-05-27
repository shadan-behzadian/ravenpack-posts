import React, { Component } from "react";
import axios from "axios";
import "../styles/postComments.css";

class PostComments extends Component {
  state = {
    comments: [],
    selectedTitle: "",
  };

  toggleInfo = (postId) => {
    this.setState({
      selectedTitle: postId,
    });
  };

  componentDidMount() {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts/${this.props.postId}/comments`
      )
      .then((response) =>
        this.setState({
          comments: response.data,
        })
      );
  }

  render() {
    return this.state.comments.map((comment) => (
      <div
        key={comment.id}
        className="comment"
        onClick={() => this.toggleInfo(comment.id)}
      >
        <p key={comment.id}>title :{comment.name}</p>
        {this.state.selectedTitle === comment.id ? (
          <p className="slideDown">body: {comment.body}</p>
        ) : null}
      </div>
    ));
  }
}

export default PostComments;
