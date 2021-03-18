import React from 'react';
import axios from 'axios';
import PostCard from "./PostCard";
import NavigationBar from './Navigationbar';
import "./Request.css"
let baseUrl = "http://localhost:4000";


class Request extends  React.Component {
  constructor(props){
    super(props);
    this.state = { questions: [],res:''}
    this.handleSubmit = this.handleSubmit.bind(this);
  }
handleSubmit(e)
{
  console.log(this.state.res)
  e.preventDefault();
  axios.get(`${baseUrl}/search/${e.target.title.value}`).then(res => {
    res.data.map(item => {
      return this.state.questions.push(item);
    });
    this.setState((this.state.questions = this.state.questions));
    
  });
}
handleChange = event => {
  this.setState({ res: event.target.value ,questions:[]});
};
	render() {
		return (
      
       <div>
         <NavigationBar/>
         <br></br>
         <form onSubmit={this.handleSubmit} method="post">
        <div class="row">
          <div class="col-sm">
            <center>
              <h1>                   Request to Sanitize
</h1>
            </center>
            
          </div>
          <div class="col-sm">
      
          <select name="title" className="titlestyle" >
          <option value="Workspace">&nbsp; Workspace &nbsp; </option>
                  <option value="Cafeteria">&nbsp; Cafeteria &nbsp;</option>
                  <option value="Washarea">&nbsp; Washarea &nbsp;</option>
                </select>
              &nbsp;
                  <button Style="width: auto;"
                    type="submit"
                    className="btn btn-success button_select"
                    id="restaurant_button"
                    //onClick={this.handleSubmit.bind(this)}
                  >
                   Request
              </button>
          </div>
          
        </div>
        {this.state.questions.map(item => (
                <PostCard data={item} />
              ))}
       </form>
      </div>

			)
	}
}
export default Request;