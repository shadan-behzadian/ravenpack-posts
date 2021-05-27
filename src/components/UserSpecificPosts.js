import React, { Component } from "react";
import axios from "axios";
import PostComments from "./PostComments";
import "../styles/userSpecificPosts.css";
import Loading from "./Loading";

class UserSpecificPosts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) =>
      this.setState({
        posts: response.data,
      })
    );
  }

  render() {
    if (this.state.posts.length !== 0) {
      return (
        <div>
          {this.state.posts.map(
            (post) =>
              post.userId === Number(this.props.match.params.userid) && (
                <div key={post.id} className="userSpecificPosts">
                  <p> {post.title}</p>
                  <p>{post.body}</p>
                  <PostComments postId={post.id} />
                </div>
              )
          )}
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default UserSpecificPosts;
