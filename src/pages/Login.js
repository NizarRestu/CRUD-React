import React from "react";
import "../style/login.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    axios.get("http://localhost:8000/users").then(({ data }) => {
      const user = data.find(
        (x) => x.username === username && x.password === password
      );
      if (user) {
        Swal.fire({
          icon: "success",
          title: "Masuk Sebagai " + username,
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("id", user.id);
        history.push("/");
        setTimeout(() => {
            window.location.reload();
          }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Username atau password tidak valid!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
      <h2>Halaman Login</h2>
      <Form onSubmit={login} method="POST" className="box">
        <h5>Login</h5>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="mb-3">
            <Form.Label>Username: </Form.Label>
            <br />
            <Form.Control
              placeholder="Enter Username"
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <div className="input">
            <Form.Label>Password: </Form.Label>
            <br />
            <Form.Control
              placeholder="Password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </Form.Group>
        <Button className="button" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
