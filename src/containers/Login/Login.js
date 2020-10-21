import React, { Component } from "react";
//import { findAllInRenderedTree } from 'react-dom/test-utils';
import classes from "./Login.module.css";
import axios from "../../axios-instance";

class login extends Component {
  /*
    componentDidMount () {
  
      axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {console.log(res)});
    }
  */
  state = {
    Email: { email: "E-Mail" },
    Password: { password: "Password" },
    AccessToken: { token: "abc" },
    Status: { status: 1 },
  };

  /*
    componentDidUpdate () {

      const post = {
        email: this.state.Email.email,
        password: this.state.Password.password,
  
      }
  
      axios.post('/user/login', post).then(res => {this.setState({ AccessToken: { token: res.data.token } }); this.setState({Status: {status: res.status}}) });
      //then(res => {console.log(res.data)})
      //then(res => {this.setState({AccessToken:{token: res.data.token}})});

    }
*/

  LoginClick = () => {
    const post = {
      email: this.state.Email.email,
      password: this.state.Password.password,
    };

    axios.post("user/login", post).then((res) => {
      this.setState({ AccessToken: { token: res.data.token } });
      this.setState({ Status: { status: res.status } });
    });

    setTimeout(this.Redirecting, 1500);
  };

  Redirecting = () => {
    if (this.state.Status.status == 200) {
      const queryParams = [];

      queryParams.push(
        encodeURIComponent("token") +
          "=" +
          encodeURIComponent(this.state.AccessToken.token)
      );

      const queryString = queryParams.join("&");

      this.props.history.push({
        pathname: "/Projects",
        search: "?" + queryString,
      });
    } else {
      alert("Login failed!");
    }
  };

  SignupClick = () => {
    this.props.history.push({
      pathname: "/Signup",
    });
  };

  EmailChangedHandler = (event) => {
    this.setState({
      Email: { email: event.target.value },
    });
  };

  PasswordChangedHandler = (event) => {
    this.setState({
      Password: { password: event.target.value },
    });
  };

  render() {
    return (
      <div className={classes.LoginScreen}>
        Login
        <input
          type="text"
          value={this.state.Email.email}
          onChange={this.EmailChangedHandler}
        ></input>
        <input
          type="password"
          value={this.state.Password.password}
          onChange={this.PasswordChangedHandler}
        ></input>
        <button className={classes.LoginButton} onClick={this.LoginClick}>
          Login
        </button>
        <p className={classes.Signup} onClick={this.SignupClick}>
          Signup
        </p>
      </div>
    );
  }
}

export default login;
