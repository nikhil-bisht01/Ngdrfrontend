import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import ErrorBoundary from "../../ErrorBoundary";

function LoginForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleInput(e) {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateCaptcha(e) {
    e.preventDefault();
    setLoading(true); // Enable loading state
    const url = `${process.env.REACT_APP_API}/secure/login`;
    const data = {
      email: `${input.email}`,
      password: `${input.password}`,
    };

    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        const data = JSON.parse(localStorage.getItem("user"));
        if (res.data.verification) {
          window.location.hash = "/student";
        } else if (res.data.message === "Email not verified") {
          window.location.hash = "/verification";
        } else if (res.data.message === "Phone not verified") {
          window.location.hash = "/verification";
        } else if (res.data.message === "Admin not verified") {
          window.location.hash = "/verification";
        }
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("Login failed! Please try again."); // Display generic error message
        }
      })
      .finally(() => {
        setLoading(false); // Disable loading state
      });
  }

  function route() {
    // Code for routing to forgot password page
  }

  return (
    <ErrorBoundary>
      <div className="login-container">
        <h2 id="heading">Login</h2>
        <p id="signup-link">
          Don't have an account?<Link to="/registration">SignUp</Link>
        </p>
        <form className="login-form">
          <div className="input">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="user-details"
              id="email"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="user-details"
              id="password"
              onChange={handleInput}
            />
          </div>
          {loading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SpinnerCircular
                  size={40}
                  color="#ffffff"
                  thickness={100}
                  speed={100}
                />
              </div>
            </div>
          )}

          <input
            type="submit"
            value="Login"
            name="submit"
            className="user-details"
            id="log-button"
            onClick={validateCaptcha}
          />

          {error && <div className="error-div">{error}</div>}

          <div className="signUp-div">
            <p id="signup-link">
              Don't have an account?<Link to="/registration">SignUp</Link>
            </p>
            <Link
              to="/components/forms/forgetpassword"
              style={{ marginLeft: "11px" }}
              onClick={route}
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </ErrorBoundary>
  );
}

export default LoginForm;
