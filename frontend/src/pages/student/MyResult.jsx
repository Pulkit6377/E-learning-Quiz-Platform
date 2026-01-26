import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function MyResults() {
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/quiz/my/attempts").then(res => {
      setAttempts(res.data.attempts || []);
    });
  }, []);

  return (
    <div className="container">
      <h2>My Quiz Results</h2>

      {attempts.length === 0 && (
        <p>You have not attempted any quiz yet.</p>
      )}

      {attempts.map((a) => (
        <div className="card" key={a._id}>
          <h4>{a.quizId?.title}</h4>
          <p>Score: {a.score}</p>

          <button
            className="btn"
            onClick={() =>
              navigate(`/quiz/${a.quizId._id}/result`)
            }
          >
            View Result
          </button>
        </div>
      ))}
    </div>
  );
}
