import React, { Component } from "react";
import axios from "axios";
import Navigationbar from "./Navigationbar";
import PostDetails from "./PostDetails";
import AddComment from "./AddComment";
import AuthService from "../services/auth.service";
import "./Comment.css";
let baseUrl = "http://localhost:4000";

class Comment extends Component {
  constructor(props) {
    super();
    this.state = { post: [], comment: [],currentUser : undefined };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    console.log(this.props.match.params.postId)
    const user = AuthService.getCurrentUser();
    //console.log(user)
    if(user)
    {
      this.setState({
      currentUser:user
      });
    }
    this.fetch();
  }

  handleUpdate(comment) {
    axios.get(`${baseUrl}/users/${comment.data.userId}`).then(user => {
      comment.data.user = user.data;
      this.forceUpdate();
    });
    this.setState(this.state.comment.push(comment.data));
  }

  async fetch() {
    const {currentUser}=this.state
    console.log(currentUser)
    await axios
      .get(`${baseUrl}/${this.props.match.params.postId}/posts`)
      .then(post => {
        this.state.post.push(post.data);
        this.setState((this.state.post = this.state.post));
        axios
          .get(`${baseUrl}/${this.props.match.params.postId}/comments`)
          .then(comment => {
            comment.data.map(item => {

              return this.state.comment.push(item);
            });
            this.setState((this.state.comment = this.state.comment));
          });
      })
     
      .catch(err => {
        alert("No post found with this ID!");
        this.props.history.push("/");
      });
      
  }

  render() {
    return (
      <div>
        <Navigationbar />
        <div className="container review">
          {this.state.post.map(item => (
            <PostDetails data={item} comments={this.state.comment} />
          ))}
          <AddComment
            data={this.props.match.params.postId}
            updated={this.handleUpdate}
          />
        </div>
      </div>
    );
  }
}
export default Comment;
