import React, { useState, useEffect } from "react";
import axios from "axios";
import PostComments from "./PostComments";
import "../styles/userSpecificPosts.css";
import Loading from "./Loading";

function UserSpecificPosts(props) {
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
        <div>
          {posts.map(
            (post) =>
              post.userId === Number(props.match.params.userid) && (
                <div key={post.id} className="userSpecificPosts">
                  <p> {post.title}</p>
                  <p>{post.body}</p>
                  <PostComments postId={post.id} />
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default UserSpecificPosts;
