import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class User extends Component {
  state = {
    user: {},
  };
  componentDidMount() {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${this.props.userId}`)
      .then((response) =>
        this.setState({
          user: response.data,
        })
      );
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
