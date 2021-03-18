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
    this.state = { questions: [] };
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
  handleNewUserMessage(message) {
    //console.log(message)
    axios.get(`http://127.0.0.1:5000/chat/${message}`
    ).then((response) => {
      console.log(response)
      if (response.status === 200) {
       
          addResponseMessage(response.data);
        
      }

    })
  }

  render() {
    return (
     
      <div>
        <Navigationbar/>
        <div className="py-5 all-cards-container">
          <div className="container" id="background">
            <div className="row hidden-sm-up">
              {this.state.questions.map(item => (
                <PostCard data={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="add_restaurant">
          <p className="add_restaurant_text">
            
          </p>
          <div className="restaurant_button">
            
            <Widget
            
         handleNewUserMessage={this.handleNewUserMessage}
          //title=""
          subtitle="Feel free to ask your enquires!!!" /> 
          </div>
        </div>
      </div>
    );
  }
}
export default Posts;
