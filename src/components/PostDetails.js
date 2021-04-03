import React, { Component } from "react";
import PostInfo from "./PostInfo";
import "./Comment.css";

export class PostDetails extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
       
        <div className="review_data">
            <p class="review_temp">{this.props.data[0].description}</p>
          <div className="review_flex4">
            <p className="post_views">{this.props.data[0].postedby} </p>
            <br></br>
            <p className="post_reviews">{this.props.data[0].comments} comments</p>          
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>

        <br></br>

        <hr />
        <h2>Comments</h2>
        {this.props.comments.map(item => (
          <PostInfo data={item} />
        ))}
      </div>
    );
  }
}

export default PostDetails;
