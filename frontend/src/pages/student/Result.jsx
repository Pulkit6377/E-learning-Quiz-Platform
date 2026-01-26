import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios.js";

export default function Result() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get(`/quiz/${id}/result`).then(res => setResult(res.data));
  }, []);

  if (!result) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Score: {result.score}/{result.total}</h2>

      {result.details.map((q, i) => (
        <div className="card" key={i}>
          <p>{q.question}</p>
          <p>Your Answer: {q.options[q.selected]}</p>
          {!q.isCorrect && (
            <p>Correct Answer: {q.options[q.correct]}</p>
          )}
        </div>
      ))}
    </div>
  );
}
