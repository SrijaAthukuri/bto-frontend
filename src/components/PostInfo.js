import React, { Component } from "react";
import "./Comment.css";

export class PostInfo extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="review_card">
        {this.props.data.user&&(
          <div className="review_follows">
            <p className="reviewer_name">{this.props.data.user.username}</p>
            <p className="reviewer_reviews">
              {this.props.data.user.reviews} comments
            </p>
          </div>
        )}
        <div className="reviewer_review">
          
        </div>
        
        <div className="reviewer_review_data">{this.props.data.comment}</div>
      </div>
    );
  }
}

export default PostInfo;
