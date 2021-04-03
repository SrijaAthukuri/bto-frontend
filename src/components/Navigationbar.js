import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import "./NavigationBar.css";

class NavigationBar extends Component {
  
  constructor(props)
  {
    super(props);
    this.state = { currentUser : undefined,currentrole:undefined};
    this.notifyUser=this.notifyUser.bind(this);
  }
  
  componentDidMount(){
    const user = AuthService.getCurrentUser();
    //console.log(user)
    if(user)
    {
      this.setState({
      currentUser:user,
      currentrole:user.user.roles
      });
    }
   }
   notifyUser(){
    alert("You need to login first");
  }
   logOut() {
    AuthService.logout();
  }
  render(){
    const { currentUser,currentrole } = this.state;
    //console.log("in nav");
   //console.log(currentUser)
  return (
    <div>
     
      <nav className="navbar navbar-expand-sm navbar-dark justify-content-between navigation">
        <Link to="/posts">
          <a className="navbar-brand mr-auto" href="/">
            
            <img
              className="navIcon"
              src={require("../images/new-logo.png")}
              alt="Logo_Image"
            />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse flex-grow-0"
          id="navbarSupportedContent"
        >
          
          {/* <ul className="navbar-nav text-right"> */}
          {/* <li className="nav-item active"> */}
          <Link to="/Request">
              <button
                type="button"
                className="btn add_restaurant_button_nav add_restaurant_text_nav"
              >
                Raise a Request
              </button>
            </Link>
            {/* </li> */}
            {/* <li className="nav-item active">
              <Link to="/login" className="links">
                <a className="nav-link login_button" href="login">
                  Login
                </a>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="links" to="/signup">
                <a className="nav-link create_button" href="registration">
                  SignUp
                </a>
              </Link>
            </li> */}
            {currentrole==="admin" ? (
              <Link to="/admin">
              <button
                type="button"
                className="btn add_restaurant_button_nav add_restaurant_text_nav"
              >
                Add admin
              </button>
            </Link>
            ):(<div></div>)}
            {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item active">
          <Link to="/AddPost">
              <button
                type="button"
                className="btn add_restaurant_button_nav add_restaurant_text_nav"
              >
                Add Post
              </button>
            </Link>
            </li>
              <li className="nav-item">
                <Link to={"/questions"} className="nav-link  create-button">
                  {currentUser.user.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link create-button" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item active">
              <Link to={"/"} className="nav-link">
              <button
                type="button"
                className="btn add_restaurant_button_nav add_restaurant_text_nav"
                onClick={this.notifyUser}
              >
                Add Post
              </button>
            </Link>
            </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link  create-button">
                  Login
                </Link>
              </li>

             
            </div>
          )}
          {/* </ul> */}
        </div>
      </nav>
    </div>
  );
}
}

export default NavigationBar;
