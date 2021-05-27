import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class User extends Component {
  _isMounted = false;
  state = {
    user: {},
  };

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${this.props.userId}`)
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            user: response.data,
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Link to={`/user/${this.props.userId}`}>
        <div className="userName">
          <i className="material-icons">person</i>
          {this.state.user.name}
        </div>
      </Link>
    );
  }
}

export default User;
