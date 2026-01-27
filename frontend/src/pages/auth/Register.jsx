import { useState } from "react";
import api from "../../api/axios.js";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/auth.css";
import "../../styles/common.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [adminKey, setAdminKey] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
      role,
    };

    // 🔐 only send adminKey if instructor
    if (role === "instructor") {
      payload.adminKey = adminKey;
    }

    await api.post("/auth/register", payload);
    navigate("/login");
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>

      <form onSubmit={submitHandler}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        {/* 👇 CONDITIONAL ADMIN KEY */}
        {role === "instructor" && (
          <textarea
            placeholder="Admin Key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            required
          />
        )}

        <button className="btn">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}


