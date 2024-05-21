import React, { useState } from "react";
import "./forgetpassword.css";
import axios from "axios";
import ErrorBoundary from "../../ErrorBoundary";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API}/secure/forget`;
    const data = {
      email: `${email}`,
    };
    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ErrorBoundary>
      <div className="content-container">
        <div className="forgot-password-container">
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <h2 className="header-reset">Forgot password</h2>
            <input
              type="email"
              placeholder="Email"
              className="user-email"
              name="cpassword"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div
              onChange={(e) => setError(e.target.value)}
              className="error-message"
              style={{ color: "rgba(255, 0, 0, 0.589)", fontSize: "15px" }}
            >
              {error}
            </div>
            <button type="submit" className="password-button">
              Forgot password
            </button>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default ForgotPasswordForm;
