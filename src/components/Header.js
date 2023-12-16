import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthState } from "../context/AuthState";
import "../styles/header.css";

function Header(args) {
  useEffect(() => {}, []);

  return (
    <div className="header">
      <div className="d-flex justify-content-start">
        <a href="/diary" className="me-3 link">
          Diary
        </a>
        <a href="/dashboard" className="me-3 link">
          Dashboard
        </a>
        <a href="/add-page" className="me-3 link">
          Add New page
        </a>
      </div>
      {/* <div>
        <Link to={{ pathname: "/diary" }}>Diary</Link>
      </div> */}
    </div>
  );
}

export default Header;
