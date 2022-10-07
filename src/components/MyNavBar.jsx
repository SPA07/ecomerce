import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import SideBar from "./SideBar";

const MyNavBar = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  

  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand to="/" as={Link} id="letter">
            E-COMMERCE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              id="nav"
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
                <i onClick={handleShow} className="fa-solid fa-cart-shopping"></i>
              </Nav.Link>
              <Nav.Link onClick={logout}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SideBar show={show} handleClose={handleClose}/>
    </>
  );
};

export default MyNavBar;
