import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Quizattempt() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(60);

  useEffect(() => {
    api.get(`/quiz/${id}/questions`).then(res => setQuestions(res.data.questions));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(t => {
        if (t === 1) submitQuiz();
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOptionChange = (questionId, optionIndex) => {
  setAnswers((prev) => ({
    ...prev,
    [questionId]: optionIndex,
  }));
};


  const submitQuiz = async () => {
    await api.post(`/quiz/${id}/submit`, { answers });
    navigate(`/student/result/${id}`);
  };

  return (
    <div className="container">
      <h3>⏱ Time Left: {time}s</h3>

      {questions.map(q => (
        <div className="card" key={q._id}>
          <p>{q.questionText}</p>
          {q.options.map((op, idx) => (
            <label key={idx}>
              <input
                type="radio"
                name={q._id}
                onChange={() => handleOptionChange(q._id, idx)}
              />
              {op}
            </label>
          ))}
        </div>
      ))}

      <button className="btn" onClick={submitQuiz}>Submit</button>
    </div>
  );
}
