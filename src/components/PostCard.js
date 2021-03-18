import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import axios from "axios";
import "./Posts.css";
let baseUrl = "http://localhost:4000";

class PostCard extends Component {
  constructor(props) {
    super();
    this.state = { currentUser : undefined};
  }
  componentDidMount(){
    const user = AuthService.getCurrentUser();
    //console.log(user)
    if(user)
    {
      this.setState({
      currentUser:user.user.roles
      });
    }
    
   }

  render() {
    const { currentUser } = this.state;
    console.log(currentUser)
    //console.log(this.props.data)
    return (
      <div className="col-md-12 cols">
        <div className="card cards">
          <Link
            className="links"
            to={`/questions/${this.props.data.id}/comments`}
          >
            <div className="post">
            
              <div className="post_data ">
                <p className="post_type">{this.props.data.description}</p>
              </div>
            
              <div>
            
                {/* <p className="post_views">{this.props.data.views} views</p> */}
                <p className="post_views">{this.props.data.comments} comments</p>
                <p className="post_reviews">posted by {this.props.data.name}</p>
              </div>
              <br></br>
            </div>
          </Link>
       
          
          </div>
      </div>
    );
  }
}

export default PostCard;
