import React, { useState } from "react";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const signIn = useSignIn();

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = { email, password };
    console.log("Values:", values);
    setErr("");

    try {
      const response = await axios.post("http://localhost:3000/login", values);
      signIn({
        token: response.data.token,
        expiresin: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
    } catch (error) {
      //   if (error.response) {
      //     // Request made and server responded (but not ok)
      //     setErr(`${error.response.data.message}`);
      //   } else if (error.request) {
      //     // The request was made but no response was received
      //     setErr('Server is offline');
      //   } else {
      //     // Something happened in setting up the request that triggered an Error
      //     setErr('Error occurred while trying to log you in')
      //   }
      // }
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <br />
          <span>Use your account</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInput}
          />
          <a href="#">Forgot your password?</a>
          <button className="btn" type="submit">
            Sign In
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost btn" id="signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
