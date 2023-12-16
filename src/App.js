import React, { useContext, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row } from "reactstrap";
import { AuthState } from "./context/AuthState";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Diary from "./components/Diary";
import Page from "./components/Page";

import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import LoginRegister from "./components/LoginRegister";
import Register from "./components/Register";
import Login from "./components/Login";
import SingleDiaryView from "./components/SingleDiaryView";
// import AuthContextProvider from "./context/AuthContext";

function App() {
  // const {is} = useContext(AuthState);

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    const route = window.location.pathname;
    if (!isLoggedIn && !["/register", "/login"].includes(route)) {
      window.location = "/login";
    }
    console.log = () => {};
  }, []);

  return (
    // <AuthContextProvider>
    <div className="App">
      <Row className="m-0 p-0">
        <Col xs={12} md={12} lg={12} className="header m-0 p-0">
          {/* <Link >Diary</Link> */}
          {/* <a href="/diary">Diary</a> <a href="/dashboard">Dashboard</a>{" "}
          <a href="/add-page">Add New page</a> */}
          <Header />
        </Col>
        <Col xs={12} className="content">
          <BrowserRouter>
            <Routes>
              {}
              <Route exact path="/diary" element={<Diary />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/:diary_id/add-page" element={<Page />} />
              <Route exact path="/diary/:id" element={<SingleDiaryView />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </Col>
        <Col xs={12} className="footer">
          <Footer />
        </Col>
      </Row>
    </div>
    // </AuthContextProvider>
  );
}

export default App;
