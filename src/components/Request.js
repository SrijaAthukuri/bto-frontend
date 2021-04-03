import React from 'react';
import axios from 'axios';
import PostCard from "./PostCard";
import NavigationBar from './Navigationbar';
import "./Request.css"
import AuthService from "../services/auth.service";

let baseUrl = "http://localhost:4000";


class Request extends  React.Component {
  constructor(props){
    super(props);
    this.state = { currentUser : undefined, workstation:undefined};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    const user = AuthService.getCurrentUser();
    //console.log(user)
    if(user)
    {
      this.setState({
      currentUser:user,
      workstation:user.user.workstation
      });
    }
   }
handleSubmit(e)
{
  console.log(this.state.res)
  e.preventDefault();
  axios.post(`${baseUrl}/request/${e.target.title.value}/${this.state.workstation}`).then(res => {
    if(res.status==200)
    {
      alert("Request Raised")
    }
    
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
        
       </form>
      </div>

			)
	}
}
export default Request;