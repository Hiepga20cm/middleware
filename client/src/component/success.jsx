import React from "react";
import Cookies from "universal-cookie";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();
function Success() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const res = await authApi.success();
    if (res.success) {
      alert(res.message);
    } else {
      alert("fail");
    }
  };
  const handleClickLogout = async () => {
    cookies.remove("token");
    cookies.remove("refreshToken");
    cookies.remove("UserId");
    console.log("Logged out");
    navigate("/login");
  };

  return (
    <>
      <button onClick={() => handleClick()}>check</button>

      <button onClick={() => handleClickLogout()}>Log Out </button>
    </>
  );
}

export default Success;
