import React from "react";
import {
  Navbar,
  Container,
  Nav
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const MyNavBar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  }


  return (
    <Navbar bg="lights" expand="lg">
      <Container fluid>
        <Navbar.Brand to="/" as={Link}>
          e-commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link to="/login" as={Link}>
              <i className="fa-solid fa-user"></i>
            </Nav.Link>
            <Nav.Link to="/purchases" as={Link}>
              <i className="fa-solid fa-box-archive"></i>
            </Nav.Link>
            <Nav.Link>
              <i className="fa-solid fa-cart-shopping"></i>
            </Nav.Link>
            <Nav.Link onClick={logout} >
              <i className="fa-solid fa-right-from-bracket"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
