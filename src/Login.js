import React, {Component} from "react"

import fire from './fire';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        this.setState({error:"Email or Password is invalid."})
      });
  }

  render() {
    return (
       <div className = "login_b">
       <form>
          <div className = "email-bg">
            <div className = "one">
              <label className = "email_l" htmlFor="exampleInputEmail1">Email address</label>
              <input value={this.state.email} onChange={this.handleChange} type="email" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className = "two">
              <label className = "password_l" htmlFor="exampleInputPassword1">Password</label>
              <input value={this.state.password} onChange={this.handleChange} type="password" name="password" id="password" placeholder="Password" />
            </div>
          </div>
          <div className = "login-wrapper">
            <button className = "login" type="submit" onClick={this.login}>Login</button>
          </div>
        </form>
        <div className = "error">{this.state.error}</div>
        </div>
      );
    }
}

//https://www.bennettnotes.com/react-login-with-google-firebase/
export default Login;