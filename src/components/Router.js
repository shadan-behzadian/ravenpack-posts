import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import UserSpecificPosts from "./UserSpecificPosts";
import PostBody from "./PostBody";
import Home from "./Home";

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/post/:id" component={PostBody} />
        <Route path="/user/:userid" component={UserSpecificPosts} />
      </Switch>
    );
  }
}

export default Router;
