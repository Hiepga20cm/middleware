import React, { useState } from "react";
import authApi from "../../api/authApi";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await authApi.login({
        email: email,
        password: password,
      });

      if (res.success == true) {
        cookies.set("token", `${res.token}`, { path: "/" });
        cookies.set("refreshToken", `${res.refreshToken}`, { path: "/" });
        cookies.set("UserId", `${res.User}`);
        alert("Đăng nhập thành công");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
