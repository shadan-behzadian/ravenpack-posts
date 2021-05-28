import React, { Component } from "react";
import axios from "axios";
import PostComments from "./PostComments";
import "../styles/userSpecificPosts.css";
import Loading from "./Loading";

class UserSpecificPosts extends Component {
  _isMounted = false;
  state = {
    posts: [],
  };

  getPosts = async () => {
    let res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    let data = res.data;
    if (this._isMounted) {
      this.setState({
        posts: data,
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.getPosts();
  }

  componentWillUnmount() {
    this._isMounted = false;
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
