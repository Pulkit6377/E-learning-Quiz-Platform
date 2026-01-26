import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import "../../styles/auth.css";
import "../../styles/common.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("LOGIN RESPONSE 👉", res.data);

    // 🔒 SAFETY CHECK
    if (!res.data || !res.data.token || !res.data.role) {
      throw new Error("Invalid login response from server");
    }

    login(res.data);

    if (res.data.role === "student") {
      navigate("/student/quizzes");
    } else {
      navigate("/instructor/dashboard");
    }

  } catch (err) {
    console.error("LOGIN ERROR 👉", err.response?.data || err.message);
    alert(
      err.response?.data?.message ||
      "Login failed. Check credentials or server."
    );
  }
};


  return (
    <div className="auth-box">
      <h1>E-learning Quiz Platform</h1>
      <h2>Login</h2>

      <form onSubmit={submitHandler}>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn">Login</button>
      </form>

      <p>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
