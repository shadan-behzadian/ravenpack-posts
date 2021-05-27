import React from "react";
import { Link } from "react-router-dom";

function HomeBtn() {
  return (
    <Link to={"/"}>
      <button className="btn waves-effect waves-light">
        <i className=" material-icons right">home</i>
      </button>
    </Link>
  );
}

export default HomeBtn;
