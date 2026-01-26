import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios.js";

export default function QuizResults() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get(`/quiz/${id}/results`).then(res => {
      setResults(res.data.results || []);
    });
  }, [id]);

  return (
    <div className="container">
      <h2>Quiz Results</h2>

      {results.length === 0 && <p>No student has attempted yet.</p>}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.studentName}</td>
              <td>{r.studentEmail}</td>
              <td>{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
