import React from "react";

class UserClass extends React.Component {
    constructor(props){
        super(props)
        // this.state = {
        //     count:0,
        // }
        console.log("Child Constructor");
        // this.incCount = this.incCount.bind(this);
    }

    componentDidMount(){
        console.log("child componentDidMount")
    }

  render() {
    console.log("Child Render")
    return (
      <div className="user-card">
         
        <h2>Name: {this.props.name}</h2>
         <h3>Location: Pune</h3>
        <h4>Contact: @shubham1303</h4>
      </div>
    ); 
  }
}

export default UserClass;