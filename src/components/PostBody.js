import React, { Component } from "react";
import PostComments from "./PostComments";
import axios from "axios";
import "../styles/postBody.css";
import Loading from "./Loading";

class PostBody extends Component {
  _isMounted = false;
  state = {
    post: null,
  };

  getUniquePost = async () => {
    let res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`
    );
    let data = res.data;
    if (this._isMounted) {
      this.setState({
        post: data,
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.getUniquePost();
  }
  componentWillUnmount() {
    this._isMounted = false;
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
