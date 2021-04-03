import React, { Component } from "react";
import "./AddPost.css";
import Navigationbar from "./Navigationbar";
import PostCard from "./PostCard";
import axios from "axios";
import AuthService from "../services/auth.service";
let baseUrl = "http://localhost:4000";

class AddPost extends Component {
  constructor() {
    super();
    this.state = { questions: [] , res:'', currentUser : undefined };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlternate = this.handleAlternate.bind(this);
  }
  componentDidMount(){
    const user = AuthService.getCurrentUser();
    //console.log(user)
    if(user)
    {
      this.setState({
      currentUser:user
      });
    }
   // const { currentUser } = this.state;
    //onsole.log(currentUser)
   }
  handleChange = event => {
    this.setState({ res: event.target.value });
  };

  handleAlternate(event) {
    //console.log(currentUser)
    event.preventDefault();
    axios.get(`${baseUrl}/suggestions/${this.state.res}`).then(res => {
      res.data.map(item => {
        return this.state.questions.push(item);
      });
      this.setState((this.state.questions = this.state.questions));
    });
  
  }

  handleSubmit(event) {
    const { currentUser } = this.state;
    event.preventDefault();
    axios
      .post(`${baseUrl}/postexperience`, {
       
        description: event.target.description.value,
        name: currentUser.user.name
      })
      .then(res => {
        if (res.status === 200) this.props.history.push("/posts");
      });
  }

  render() {
    
   // console.log(currentUser)
    return (
      <div>
        <Navigationbar />
        <div className="container containerBody">
          <h2>
            <b>Post your thoughts</b>
          </h2>
          <div className="container content">
            <form onSubmit={this.handleSubmit} method="post">
              <div className="form-group">
               
              </div>
              <div className="form-group">
                <label className="question">Description</label>
                <textarea

                  
                  name="description"
                  className="form-control"
                  placeholder="Add your words..."
                  required
                />
              </div>
              <br />
              <div class="row">
                <div class="col-sm-12 text-center">
                  <button Style="width: auto;"
                    type="submit"
                    className="btn btn-success button_select"
                    id="restaurant_button"
                  >
                    Add Post
              </button></div></div>

            </form>
          </div>
        </div>
        <div>
        {this.state.questions.map(item => (
                <PostCard data={item} />
              ))}
        </div>
      </div>
    );
  }
}

export default AddPost;
