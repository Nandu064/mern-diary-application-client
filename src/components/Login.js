import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { API_URL, isLoggedIn } from "../helpers/constants";
import { AuthState } from "../context/AuthState";

const Login = () => {
  const [formDetails, setFormDetails] = useState({});
  const { isLogggedIn, setIsLogggedIn, setUserDetails, userDetails } =
    useContext(AuthState);

  const handelsubmit = (e) => {
    e.preventDefault();
    let payload = {
      ...formDetails,
    };
    axios.post(`${API_URL}/user/login`, payload).then((res) => {
      console.log("res: ", res);
      if (Object.keys(res.data).length > 0) {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("isLoggedIn", true);
        setIsLogggedIn(true);
        setUserDetails(res.data);
        window.location = "/dashboard";
      }
    });
    // console.log("formDetails: ", formDetails);
  };
  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="container form_container">
      <div className="form-box">
        <div className="row" style={{ width: "100%" }}>
          <div className="col col-md-6 col-xs-12 content_left">
            <div className="content_left1">
              <div className="content_wrapper">
                <p className="welcome_text">
                  Hi there!
                  <br />
                  Welcome back
                </p>
                <small>
                  No account?
                  <a href="/register" className="create_account">
                    Create One!
                  </a>
                </small>
              </div>
            </div>
          </div>
          <div className="col col-md-6 col-xs-12">
            <div className="right_content">
              <h1 className="signUpHeading">Login</h1>
              <form id="login_form">
                <div className="input-group">
                  <div className="input-group input-group-sm mb-3 form-field">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-envelope"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                      </svg>
                    </span>
                    <input
                      required
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Email or Username"
                      name="username"
                      id="username"
                    />
                  </div>
                  <div className="input-group input-group-sm mb-3 form-field">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-key"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                    </span>
                    <input
                      required
                      onChange={handleChange}
                      type="password"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      name="password"
                      placeholder="Password"
                      id="password"
                    />
                  </div>
                  <p className="forgot_text">
                    Forgot Password?{" "}
                    <a href="" className="click_here">
                      click here!
                    </a>
                  </p>
                  <button
                    type="submit"
                    className="sign_up"
                    onClick={handelsubmit}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
