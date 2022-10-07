import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const submit = (data) => {
    // console.log(data);
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
        data
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        // console.log(res.data.data.token)
        navigate("/");
      })
      .catch((error) => {
        if (error?.status === 404) {
          alert("Credenciales inválidas");
        }
        console.log(error);
      });
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <h2>Welcome! Please enter your email and password to continue</h2>
        <div className="test-data-container">
          <h3>Test Data</h3>
          <span>
            <i className="fa-solid fa-envelope"></i>
            <p>mahomes@gmail.com</p>
          </span>
          <span>
            <i className="fa-solid fa-lock"></i>
            <p>mahomes</p>
          </span>
        </div>
        <Form className="form-login" onSubmit={handleSubmit(submit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register("email")}
              type="email"
              placeholder="Enter email"
              className="form-input-login"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              {...register("password")}
              type="password"
              placeholder="Password"
              className="form-input-login"
            />
          </Form.Group>
          <Button variant="dark" type="submit" className="btn-form-login">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
