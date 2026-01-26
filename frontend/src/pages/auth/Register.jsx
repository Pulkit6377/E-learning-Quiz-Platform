import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios.js";
import "../../styles/auth.css";
import "../../styles/common.css";


export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    navigate("/");
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>

      <form onSubmit={submitHandler}>
        <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})}/>
        <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})}/>
        <select onChange={e => setForm({...form, role:e.target.value})}>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <button className="btn">Register</button>
      </form>

      <Link to="/">Back to login</Link>
    </div>
  );
}

