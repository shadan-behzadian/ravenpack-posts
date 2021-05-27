import React, { Component } from "react";
import PostComments from "./PostComments";
import axios from "axios";
import "../styles/postBody.css";
import Loading from "./Loading";

class PostBody extends Component {
  state = {
    post: null,
  };

  componentDidMount() {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`
      )
      .then((response) =>
        this.setState({
          post: response.data,
        })
      );
  }

  render() {
    if (this.state.post !== null) {
      return (
        <div className="postBody">
          <p>Title: {this.state.post.title}</p>
          <p>Body: {this.state.post.body}</p>
          <div className="postComments">
            <PostComments postId={this.props.match.params.id} />
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default PostBody;
