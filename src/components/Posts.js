import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import User from "./User";
import { Link } from "react-router-dom";
import "../styles/posts.css";
import Loading from "./Loading";
import "../styles/error.css";
function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = false;
    async function getPosts() {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!isMounted) {
          setLoading(false);
          setPosts(res.data);
        }
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    }

    getPosts();
    return function () {
      isMounted = true;
    };
  });

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {loading && <Loading />}
      {posts.length !== 0 && (
        <div className="posts">
          {posts.map((post) => (
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
      )}
    </div>
  );
}

export default Posts;
