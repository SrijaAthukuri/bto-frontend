import React, { Component } from "react";
import "./Login.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Navigationbar from "./Navigationbar";
import AuthService from "../services/auth.service";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: ""
    };
  }
  
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (true) {
      AuthService.login(this.state.email, this.state.password).then(
        () => {
          this.props.history.push("/posts");
         // window.location.reload();
        },
        error => {
            
          this.setState({
            loading: false,
            message: error.response.data
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div>
        <Navigationbar />
        <div className="d-flex justify-content-center align-items-center container login">
          <Form onSubmit={this.handleSubmit} ref={c => {
              this.form = c;
            }}>
            <h2 align="center">
              <b>LOGIN</b>
            </h2>
            <hr />
            <div className="form-group">
              <label
                for="inputName"
                className="control-label registration_text"
              >
                Email Address
              </label>
              <Input
                type="text"
                name="email"
                className="form-control login_field"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label
                for="inputPassword"
                className="control-label registration_text"
              >
                Password
              </label>
              <Input
                type="password"
                name="password"
                className="form-control login_field"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-danger signin_button"  disabled={this.state.loading}>
              {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span></button>
            </div>{this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <label className="terms">
              By logging in, You agree to BTO's{" "}
              <span className="terms_a">Terms of Service</span>,{" "}
              <span className="terms_a">Cookie Policy</span>,{" "}
              <span className="terms_a">Privacy Policy</span> and{" "}
              <span className="terms_a">Content Policy</span>
            </label>
            
          
            
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
