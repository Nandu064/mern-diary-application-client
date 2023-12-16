import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthState } from "../context/AuthState";
import "../styles/header.css";
import { getUserDetails } from "../helpers/constants";

function Header(args) {
  const { userDetails, isLogggedIn } = useContext(AuthState);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const userData = getUserDetails();
    setUserData(userData);
  }, [isLogggedIn]);

  const pathname = window.location.pathname;

  return (
    <div className="header d-flex justify-content-between">
      <div className="d-flex justify-content-start">
        <a href="/dashboard" className="me-3 link">
          Dashboard
        </a>
        {/* <a href="/add-page" className="me-3 link">
          Add New page
        </a> */}
      </div>
      {/* <div>
        <Link to={{ pathname: "/diary" }}>Diary</Link>
      </div> */}
      <div>
        {isLogggedIn ? (
          userData?.name ? (
            userData?.name
          ) : (
            ""
          )
        ) : pathname === "/login" ? (
          <a href="/register" className="me-3 link">
            Register
          </a>
        ) : (
          <a href="/login" className="me-3 link">
            Login
          </a>
        )}
      </div>
    </div>
  );
}

export default Header;
