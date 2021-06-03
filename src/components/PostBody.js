import React, { useState, useEffect } from "react";
import PostComments from "./PostComments";
import axios from "axios";
import "../styles/postBody.css";
import Loading from "./Loading";
import "../styles/error.css";

function PostBody(props) {
  const [post, setPost] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = false;
    async function getUniquePost() {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${props.match.params.id}`
        );
        if (!isMounted) {
          setLoading(false);
          setPost(res.data);
        }
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    }

    getUniquePost();
    return function () {
      isMounted = true;
    };
  }, [props.match.params.id]);

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {loading && <Loading />}
      {post != null && (
        <div className="postBody">
          <p>Title: {post.title}</p>
          <p>Body: {post.body}</p>
          <div className="postComments">
            <PostComments postId={props.match.params.id} />
          </div>
        </div>
      )}
    </div>
  );
}
export default PostBody;
