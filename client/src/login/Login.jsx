import React, { Component } from "react";
import "./Login.css";
import Alert from "../NewsBox/Alert";
import Dashboard from "../dashboard/Dashboard.jsx"; // Import your Dashboard component
import Home from "../home/Home.jsx";
import User_DashBoard from "../dashboard/User_DashBoard.jsx";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      err: "",
      isAdmin:false,
      isSignUpActive: false,
      isAuthenticated: false,
      token: "",
      expiresIn: 0,
    };
  }

  componentDidMount() {
    // Check if token exists in localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Token found, set isAuthenticated to true
      this.setState({ isAuthenticated: true, token });
    }
  }

  handleSignUpClick = () => {
    this.setState({ isSignUpActive: true, err: "" });
  };

  handleSignInClick = () => {
    this.setState({ isSignUpActive: false, err: "" });
  };

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  
  handleAdmin=(event)=>{
    this.setState({isAdmin:event.target.checked})
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, isAdmin } = this.state; // Extract isAdmin from state
    const values = { email, password };
    console.log("Values:", values);
    this.setState({ err: "" });

    try {
      const endpoint = isAdmin
        ? "http://localhost:4000/api/admin/login"
        : "http://localhost:4000/api/user/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Network response was not ok");
      } else {
        this.setState({ err: "" });
      }

      const data = await response.json();
      this.setState({
        isAuthenticated: true,
        token: data.token,
        expiresIn: 3600,
        err: "",
      });
      localStorage.setItem('accessToken', data.token);
    } catch (error) {
      console.error(error);
      this.setState({ err: error.message || "An error occurred" });
    }
  };

  handleSubmitSignUp = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const values = { email, password };
    console.log("Values:", values);
    this.setState({ err: "" });

    try {
      const response = await fetch("http://localhost:4000/api/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Network response was not ok");
      } else {
        this.setState({ err: "" });
      }

      console.log(response)

      const data = await response.json();
      this.setState({
        isAuthenticated: true,
        token: data.token,
        expiresIn: 3600,
        err: "",
      });
    } catch (error) {
      console.error(error);
      this.setState({ err: error.message || "An error occurred" });
    }
  };


  render() {
    const { email, password, err, isSignUpActive, isAuthenticated } =
      this.state;

    // Redirect to Dashboard component if authenticated
    if (
      email === "admin@gmail.com" &&
      password === "admin123" &&
      isAuthenticated
    ) {
      return <Dashboard />;
    } else if (isAuthenticated) {
      return <User_DashBoard />;
    }

    return (
      <div className="main">
        <div
          className={`container1 ${isSignUpActive ? "right-panel-active" : ""}`}
          id="container1"
        >
          {/* Sign-up form */}
          <div className="form-container1 sign-up-container1">
            <form className="form1" onSubmit={this.handleSubmitSignUp}>
              {" "}
              {/* Change to handleSubmitSignUp */}
              <h1 className="h1">Create Account</h1>
              <span>use your email for registration</span>
              {err && <Alert message={err} />}
              <input
                className="input1"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.handleInput}
              />
              <input
                className="input1"
                type="passord"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleInput}
              />
              <button className="btnlogin" type="submit">
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign-in form */}
          <div className="form-container1 sign-in-container1">
            <form className="form2" onSubmit={this.handleSubmit}>
              <h1 className="h1">Sign in</h1>
              <span>use your account</span>
              {err && <Alert message={err} />}
              <input
                className="input1"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.handleInput}
              />
              <input
                className="input1"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleInput}
              />
              <div className="form-check-inline form-check-inline">
                <label className="label" htmlFor="admin">
                  Admin: &nbsp;
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="admin"
                  name="admin"
                  style={{ borderColor: 'red' }}
                  onChange={this.handleAdmin}
                />
              </div>



              
              <button className="btnlogin" type="submit">
                Sign In
              </button>
            </form>
          </div>

          {/* Overlay content */}
          <div className="overlay-container1">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="h1">Welcome Back!</h1>
                <p className=".p">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="btnlogin ghost"
                  id="signIn"
                  onClick={this.handleSignInClick}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="h1">Hello, Friend!</h1>
                <p className=".p">
                  Enter your personal details and start journey with us
                </p>
                <button
                  className="btnlogin ghost"
                  id="signUp"
                  onClick={this.handleSignUpClick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
