import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function User(props) {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = false;
    async function getUser() {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${props.userId}`
        );
        if (!isMounted) {
          setUser(res.data);
        }
      } catch (err) {
        setError(err.message);
      }
    }
    getUser();
    return function () {
      isMounted = true;
    };
  }, [props.userId]);

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {user && (
        <Link to={`/user/${props.userId}`} className="userName">
          <i className="material-icons">person</i>
          {user.name}
        </Link>
      )}
    </div>
  );
}

export default User;
