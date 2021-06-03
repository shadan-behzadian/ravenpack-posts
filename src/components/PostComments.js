import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/postComments.css";
import "../styles/error.css";

function PostComments(props) {
  const [comments, setComments] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [error, setError] = useState(null);

  const toggleInfo = (postId) => {
    setSelectedTitle(postId);
  };

  useEffect(() => {
    let isMounted = false;
    async function getComments() {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${props.postId}/comments`
        );
        if (!isMounted) {
          setComments(res.data);
        }
      } catch (err) {
        setError(err.message);
      }
    }
    getComments();
    return function () {
      isMounted = true;
    };
  }, [props.postId]);

  return (
    <div>
      {error && <div className="error">{error}</div>}

      {comments &&
        comments.map((comment) => (
          <div
            key={comment.id}
            className="comment"
            onClick={() => toggleInfo(comment.id)}
          >
            <p key={comment.id}>title :{comment.name}</p>
            {selectedTitle === comment.id ? (
              <p className="slideDown">body: {comment.body}</p>
            ) : null}
          </div>
        ))}
    </div>
  );
}

export default PostComments;
