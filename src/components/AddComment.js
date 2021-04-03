import React, { Component } from "react";
import axios from "axios";
import "./Comment.css";
let baseUrl = "http://localhost:4000";

class AddComment extends Component {
  constructor(props) {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }


  handleSubmit(event) {
    event.preventDefault();
    let form = event.target;
    console.log(form);
    axios
      .post(`${baseUrl}/${this.props.data}/comment`, {
        comment: event.target.comment.value,
      })
      .then(res => {
        if (res.status === 200) this.props.history.push("/");
      });

  }

  render() {
    return (
      <div className="review_box">
        <form onSubmit={this.handleSubmit} className="form-group review_add">
          <h4 align="left">Add your comment</h4>
          <input
            className="form-control"
            name="comment"
            type="text"
            placeholder="Share your comment ..."
            required
          />
          <button className="btn btn-success review_button">
            Add Your Comment
          </button>
        </form>
      </div>
    );
  }
}

export default AddComment;
