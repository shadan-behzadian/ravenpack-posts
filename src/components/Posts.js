import React from "react";
import axios from "axios";
import { Component } from "react";
import User from "./User";
import { Link } from "react-router-dom";
import "../styles/posts.css";
import Loading from "./Loading";

class Posts extends Component {
  _isMounted = false;
  state = {
    posts: [],
    selectedpost: "",
  };

  toggleInfo = (postId) => {
    this.setState({
      selectedpost: postId,
    });
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
        <div className="posts">
          {this.state.posts.map((post) => (
            <div key={post.id} className="post">
              <User userId={post.userId} />
              <Link to={`/post/${post.id}`}>
                <p className="postTitle">
                  <i className="material-icons">mail</i>
                  {post.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default Posts;
