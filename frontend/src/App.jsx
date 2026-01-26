import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

import Quizlist from "./pages/student/Quizlist.jsx";
import Quizattempt from "./pages/student/Quizattempt.jsx";
import Result from "./pages/student/Result.jsx";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Dashboard from "./pages/instructor/Dashboard.jsx";
import CreateQuiz from "./pages/instructor/CreateQuiz.jsx";
import AddQuestion from "./pages/instructor/AddQuestion.jsx";
import QuizQuestions from "./pages/instructor/QuizQuestions.jsx";
import QuizResults from "./pages/instructor/QuizResults.jsx";
import MyResults from "./pages/student/MyResult.jsx";

import "./styles/common.css";
import "./styles/navbar.css";
import "./styles/table.css";


export default function App() {
  return (
    <>
      {/* Navbar visible only when logged in */}
      <Navbar />

      <Routes>
        {/* ---------- Auth ---------- */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ---------- Student Routes ---------- */}
        <Route
          path="/student/quizzes"
          element={
            <ProtectedRoute role="student">
              <Quizlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/quiz/:id"
          element={
            <ProtectedRoute role="student">
              <Quizattempt />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/result/:id"
          element={
            <ProtectedRoute role="student">
              <Result />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/results"
          element={
            <ProtectedRoute allowedRole="student">
            <MyResults />
            </ProtectedRoute>
          }
        />
        ---------- Instructor Routes ----------
        <Route
          path="/instructor/dashboard"
          element={
            <ProtectedRoute role="instructor">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/create"
          element={
            <ProtectedRoute role="instructor">
              <CreateQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/add-question/:id"
          element={
            <ProtectedRoute role="instructor">
              <AddQuestion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/quiz/:id/results"
          element={
            <ProtectedRoute role="instructor">
              <QuizResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/quiz/:id/questions"
          element={
            <ProtectedRoute allowedRole="instructor">
              <QuizQuestions />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}