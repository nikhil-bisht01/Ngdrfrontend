import React, { useEffect, useState } from "react";
import "./ContactForm.css";
import axios from "axios";
import { Alert } from "@mui/material";
import ErrorBoundary from "../../ErrorBoundary";

function ContactForm() {
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [viewSubject, setViewSubject] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = [];

    // Validate form fields
    if (name.trim() === "") {
      newErrors.push("Name is required.");
      return;
    }

    if (email.trim() === "") {
      newErrors.push("Email address is required.");
      return;
    }

    if (phone.trim() === "") {
      newErrors.push("Phone number is required.");
      return;
    }

    if (subject.trim() === "") {
      newErrors.push("Subject is required.");
      return;
    }

    if (message.trim() === "") {
      newErrors.push("Message is required.");
      return;
    }
    if (message.split("").length > 40) {
      newErrors.push("Message length can't be exceed 500 characters");
      console.log(newErrors);
      return;
    }
    if (newErrors.length > 0) {
      setErrors([...newErrors]);
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/contact/v0`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              phone,
              subject,
              description: message,
            }),
          }
        );

        if (response.ok) {
          setName("");
          setEmail("");
          setPhone("");
          setSubject("");
          setMessage("");
          setErrors([]);
          setSuccessAlert(true);
          setTimeout(() => {
            setSuccessAlert(false);
          }, 5000);
        } else {
          setErrorAlert(true);
          setTimeout(() => {
            setErrorAlert(false);
          }, 5000);
        }
      } catch (error) {
        setErrorAlert(true);
        setTimeout(() => {
          setErrorAlert(false);
        }, 5000);
      }
    }
  };

  function viewSubjectFun() {
    const url = `${process.env.REACT_APP_API}/contact/office_view`;
    axios
      .get(url)
      .then((res) => {
        setViewSubject(res.data.office);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    viewSubjectFun();
  }, []);
  return (
    <ErrorBoundary>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2 id="con">Contact us</h2>
          {successAlert && (
            <Alert severity="success" style={{ marginBottom: "20px" }}>
              Query Submitted Successfully
            </Alert>
          )}
          {errorAlert && (
            <Alert severity="error" style={{ marginBottom: "20px" }}>
              Something went wrong Please try again
            </Alert>
          )}
          {errors.length > 0 && (
            <div className="error-div">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <input
            name="name"
            type="text"
            placeholder="Name"
            className="inp"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            className="inp"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            name="phoneNumber"
            type="text"
            placeholder="Phone"
            className="inp"
            id="phone-number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />

          <select
            name="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
          >
            <option value="" disabled>
              Subject
            </option>
            {viewSubject.map((data, index) => {
              return (
                <option key={index} value={data.office}>
                  {data.office}
                </option>
              );
            })}
          </select>

          <textarea
            name="message"
            className="textarea"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            placeholder="Enter Query"
          ></textarea>

          <input
            name="submit"
            type="submit"
            value="Submit"
            className="submit-btn"
          />
        </form>
      </div>
    </ErrorBoundary>
  );
}

export default ContactForm;
