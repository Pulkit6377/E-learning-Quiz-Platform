import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios.js";

export default function AddQuestion() {
  const { id } = useParams();

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();

    await api.post(`/quiz/${id}/question`, {
      questionText,
      options,
      correctOptionIndex: correctIndex,
    });

    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);

    alert("Question added");
  };

  const handleOptionChange = (value, index) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  return (
    <div className="container">
      <h2>Add Question</h2>

      <form onSubmit={submitHandler}>
        <input
          placeholder="Question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
        />

        {options.map((opt, i) => (
          <input
            key={i}
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(e.target.value, i)}
            required
          />
        ))}

        <select
          value={correctIndex}
          onChange={(e) => setCorrectIndex(Number(e.target.value))}
        >
          <option value={0}>Correct Option 1</option>
          <option value={1}>Correct Option 2</option>
          <option value={2}>Correct Option 3</option>
          <option value={3}>Correct Option 4</option>
        </select>

        <button className="btn">Add Question</button>
      </form>
    </div>
  );
}
