import { BrowserRouter, Route, Routes } from "react-router-dom";
import Success from "./component/Success";
import Login from "./component/LoginForm/Login";
// import Register from "./component/Register/Register";
import Cookies from "universal-cookie";
const cookies = new Cookies();
function App() {
  const token = cookies.get("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* /<Route path="/register" element={!token ? <Register /> : <Login />} /> */}

        <Route path="/success" element={!token ? <Login /> : <Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
