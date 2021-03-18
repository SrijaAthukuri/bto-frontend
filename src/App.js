import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Posts from "./components/Posts";
import Login from "./components/Login";
import Comment from "./components/Comment";
import AddPost from "./components/AddPost";
import ErrorNotFound from "./components/ErrorNotFound";
import Request from "./components/Request";
import AuthService from "./services/auth.service";

class App extends Component {
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = { currentUser : undefined};
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
 }
 logOut() {
  AuthService.logout();
}

  render(){
    const { currentUser } = this.state;
//console.log(currentUser)
  return (
    
    <Router>
      <div>
        <Switch>
        
          <Route exact path={"/"} component={Login}  />
           <Route exact path="/posts" component={Posts} data={currentUser} />
         
          <Route
            exact
            path="/posts/:postId/comments"
            component={Comment}
          />
          <Route exact path="/request" component={Request}/>
          <Route exact path="/addpost" component={AddPost} />

          <Route component={ErrorNotFound} />
        </Switch>
      </div>
    </Router>
  );}
}

export default App;
