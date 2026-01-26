import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios.js";

export default function QuizQuestions() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
  api.get(`/quiz/${id}/questions`).then(res => {
    setQuestions(res.data.questions); // 👈 FIX
  });
}, [id]);


  return (
    <div className="container">
      <h2>Quiz Questions</h2>

      {questions.length === 0 && <p>No questions added yet.</p>}

      {questions.map((q, index) => (
        <div className="card" key={q._id}>
          <h4>Q{index + 1}. {q.questionText}</h4>


          <ul>
            {q.options.map((opt, i) => (
              <li
                key={i}
                style={{
                  color:
                    i === q.correctOptionIndex ? "green" : "black",
                  fontWeight:
                    i === q.correctOptionIndex ? "bold" : "normal",
                }}
              >
                {opt}
              </li>
            ))}
          </ul>

          <p>
            Correct Option:{" "}
            {q.correctOptionIndex !== undefined
              ? `Option ${q.correctOptionIndex + 1}`
              : "Not available"}
          </p>
        </div>
      ))}
    </div>
  );
}
