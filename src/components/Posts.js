import React, { Component, useEffect } from "react";
import axios from "axios";
import "./Posts.css";
import Navigationbar from "./Navigationbar";
import PostCard from "./PostCard";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
let baseUrl = "http://localhost:4000";

class Posts extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = { posts: [] };
  }

  componentDidMount() {
    this.fetch();
    addResponseMessage('Welcome!!');
  }

  async fetch() {
    
    await axios.get(`${baseUrl}/posts`).then(res => {
      res.data.map(item => {
        return this.state.posts.push(item);
      });
      this.setState((this.state.posts = this.state.posts));
    });
  }


  render() {
    return (
     
      <div>
        <Navigationbar/>
        <div className="py-5 all-cards-container">
          <div className="container" id="background">
            <div className="row hidden-sm-up">
              {this.state.posts.map(item => (
                <PostCard data={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="add_restaurant">
          <p className="add_restaurant_text">
            
          </p>
          <div className="restaurant_button">
            
           
          </div>
        </div>
      </div>
    );
  }
}
export default Posts;
