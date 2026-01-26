import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
// import "../styles/navbar.css";

export default function Navbar() {
  const { role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // hide navbar on login/register
  if (!role) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Quiz Platform</h2>

      <div className="links">
        {role === "student" && (
          <>
            <Link to="/student/quizzes">Quizzes</Link>
            <Link to="/student/results">My Results</Link>

          </>
        )}

        {role === "instructor" && (
          <>
            <Link to="/instructor/dashboard">Dashboard</Link>
            <Link to="/instructor/create">Create Quiz</Link>
          </>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
