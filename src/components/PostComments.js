import React, { Component } from "react";
import axios from "axios";
import "../styles/postComments.css";

class PostComments extends Component {
  _isMounted = false;
  state = {
    comments: [],
    selectedTitle: "",
  };

  toggleInfo = (postId) => {
    this.setState({
      selectedTitle: postId,
    });
  };

  getComments = async () => {
    let res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${this.props.postId}/comments`
    );
    let data = res.data;
    if (this._isMounted) {
      this.setState({
        comments: data,
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.getComments();
  }

  componentWillUnmount() {
    this._isMounted = false;
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
