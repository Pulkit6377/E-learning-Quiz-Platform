import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

export default function Quizlist() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/quiz/quizzes").then(res => setQuizzes(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Available Quizzes</h2>

      {quizzes.map(q => (
        <div className="card" key={q._id}>
          <h3>{q.title}</h3>
          <button className="btn" onClick={() => navigate(`/student/quiz/${q._id}`)}>
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );
}
