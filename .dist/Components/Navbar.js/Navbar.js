import React from "react";
import "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Navigation = (props) => {
  console.log(props);
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">Education Rescue</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Signup">Signup</Nav.Link>
          <Nav.Link href="/Login">Login</Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
