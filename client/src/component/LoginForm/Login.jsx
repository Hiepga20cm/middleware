import "./Login.css";
import React, { useState } from "react";
import authApi from "../../api/authApi";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email: email,
        password: password,
      });

      console.log(res);
      if (res.data.success == true) {
        cookies.set("token", `${res.data.token}`, { path: "/" });
        cookies.set("refreshToken", `${res.data.refreshToken}`, { path: "/" });
        cookies.set("UserId", `${res.data.User}`);
        alert("Đăng nhập thành công");
        navigate("/success");
        window.location.reload(false);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div class="login-page">
      <div class="form">
        <form class="register-form">
          <input type="text" placeholder="name" />
          <input type="password" placeholder="password" />
          <input type="text" placeholder="email address" />
          <button>create</button>
          <p class="message">
            Already registered? <a href="#">Sign In</a>
          </p>
        </form>
        <form class="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="username"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button>login</button>
          <p class="message">
            Not registered? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
