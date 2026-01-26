import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await api.post("/quiz/create", {
      title,
      description,
      timeLimit,
    });

    navigate(`/instructor/add-question/${res.data._id}`);
  };

  return (
    <div className="container">
      <h2>Create Quiz</h2>

      <form onSubmit={submitHandler}>
        <input
          placeholder="Quiz Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Time Limit (minutes)"
          onChange={(e) => setTimeLimit(e.target.value)}
          required
        />

        <button className="btn">Create Quiz</button>
      </form>
    </div>
  );
}
