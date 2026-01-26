import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    const res = await api.get("/quiz/instructor/quizzes");
    setQuizzes(res.data);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const togglePublish = async (id) => {
    await api.patch(`/quiz/${id}/publish`);
    fetchQuizzes(); // refresh state
  };

  return (
    <div className="container">
      <h2>Instructor Dashboard</h2>

      {quizzes.map((q) => (
        <div className="card" key={q._id}>
          <h3>{q.title}</h3>
          <p>Status: {q.isPublished ? "🟢 Published" : "🔴 Draft"}</p>

          <button
            className="btn"
            onClick={() => navigate(`/instructor/add-question/${q._id}`)}
          >
            Add Questions
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => togglePublish(q._id)}
            style={{ marginLeft: "10px" }}
          >
            {q.isPublished ? "Unpublish" : "Publish"}
          </button>
          <button
            className="btn"
            onClick={() => navigate(`/instructor/quiz/${q._id}/questions`)}
            style={{ marginLeft: "10px" }}
          >
            View Questions
          </button>
          <button
             className="btn"
            onClick={() => navigate(`/instructor/quiz/${q._id}/results`)}
            style={{ marginLeft: "10px" }}
          >
            View Results
          </button> 
        </div>
      ))}
    </div>
  );
}
