import { useState } from "react";
import API from "../services/api";
import "./Login.css";
import { useNavigate } from "react-router-dom";



function Login() {


    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();

  console.log("LOGIN CLICKED");

  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

localStorage.setItem(
  "token",
  res.data.token
);
localStorage.setItem(
  "role",
  res.data.role
);

navigate("/Events");

    console.log("SUCCESS", res.data);

  } catch (error) {
    console.log("ERROR", error);
  }
};

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Event Manager</h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;