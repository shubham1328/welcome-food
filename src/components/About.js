import React from "react";
import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";
import UserContext from "../utils/UserContext";

class About extends Component {
  constructor(props) {
    super(props);
    console.log("Parent Constructor");
  }

  componentDidMount() {
    console.log("parent componentDidMount");
  }

  render() {
    console.log("Parent Render");
    return (
      <>
        <div>About class</div>
        <h1>THis is the about us component</h1>
        {/* <User name={"Shubham O (Function)"}/> */}
        <UserContext.Consumer>
          {(UserContext) => {
            return <h1 className="text-xl font-extrabold">{UserContext.loggedInUser}</h1>;
          }}
        </UserContext.Consumer>
        <UserClass name={"Shubham O (class)"} />
      </>
    );
  }
}

export default About;
