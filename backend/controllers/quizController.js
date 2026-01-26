import questionModel from "../models/questionModel.js";
import quizModel from "../models/quizModel.js";
import attemptModel from "../models/attemptModel.js";
import userModel from "../models/userModel.js";

export const createQuiz = async (req, res) => {
  try {
    const { title, description, timeLimit } = req.body;

    const quiz = await quizModel.create({
      title,
      description,
      timeLimit,
      createdBy: req.user.id || req.user.userId, // 🔥 THIS LINE
      isPublished: false,
    });

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Quiz creation failed" });
  }
};


export const addQuestion = async (req,res) => {
    const q = await questionModel.create({...req.body,quizId:req.params.id});
    res.json(q);
}

export const getQuizzes = async(req,res) => {
    const quizzes = await quizModel.find({isPublished:true});
    res.json(quizzes);
}

export const getQuizQuestions = async(req,res) => {
    const quizId = req.params.id;

    const quiz = await quizModel.findById(quizId);
    if(!quiz || !quiz.isPublished){
        return res.status(404).json({message:"Quiz not found"});
    }

    const questions = await questionModel.find({quizId},{correctOptionIndex:0});

    res.json({
        success:true,
        quiz:{
            _id:quiz._id,
            title:quiz.title,
            quiz:quiz.description,
            timeLimit:quiz.timeLimit
        },
        questions,
    })
}

export const submitQuestion = async (req, res) => {
  try {
    const quizId = req.params.id;
    const studentId = req.user.id || req.user.userId;
    const { answers } = req.body;

    const existing = await attemptModel.findOne({ quizId, studentId });
    if (existing) {
      return res.status(400).json({ message: "Already attempted" });
    }

    const questions = await questionModel.find({ quizId });

    let score = 0;

    questions.forEach((q) => {
      if (
        Number(answers[q._id.toString()]) ===
        q.correctOptionIndex
      ) {
        score++;
      }
    });

    const attempt = await attemptModel.create({
      quizId,
      studentId,
      answers,
      score, // ✅ MUST be this variable
    });

    console.log("SAVED SCORE 👉", attempt.score);

    res.json({
      success: true,
      score,
    });
  } catch (err) {
    console.error("SUBMIT ERROR", err);
    res.status(500).json({ message: "Submit failed" });
  }
};




export const getQuizResult = async (req, res) => {
  try {
    const quizId = req.params.id;
    const studentId = req.user.id || req.user.userId;

    const attempt = await attemptModel.findOne({ quizId, studentId });
    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    const questions = await questionModel.find({ quizId });
    let score = 0;

    const details = questions.map((q) => {
      const selectedOptionIndex =
        attempt.answers[q._id.toString()];

      const isCorrect =
        selectedOptionIndex === q.correctOptionIndex;

      if (isCorrect) score++;

      return {
        question: q.questionText,
        options: q.options,
        selectedOptionIndex,
        correctOptionIndex: q.correctOptionIndex,
        isCorrect,
      };
    });

    res.json({
      score,
      total: questions.length,
      details,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Result error" });
  }
};

export const togglePublishQuiz = async (req, res) => {
  try {
    const quiz = await quizModel.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    quiz.isPublished = !quiz.isPublished;
    await quiz.save();

    res.json({
      success: true,
      isPublished: quiz.isPublished,
    });
  } catch (err) {
    res.status(500).json({ message: "Publish toggle failed" });
  }
};

export const getInstructorQuizzes = async (req, res) => {
  try {
    const instructorId = req.user.id || req.user.userId;

    const quizzes = await quizModel.find({
      createdBy: instructorId
    });

    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch instructor quizzes" });
  }
};


export const getQuizResultsForInstructor = async (req, res) => {
  try {
    const quizId = req.params.id;

    // 1️⃣ fetch all attempts for this quiz
    const attempts = await attemptModel.find({ quizId });

    // 2️⃣ populate student info
    const results = await Promise.all(
      attempts.map(async (attempt) => {
        const student = await userModel.findById(attempt.studentId);

        return {
          studentName: student?.name,
          studentEmail: student?.email,
          score: attempt.score,
        };
      })
    );

    res.json({
      success: true,
      results,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch results" });
  }
};


export const getMyAttempts = async (req, res) => {
  try {
    const studentId = req.user.id || req.user.userId;

    const attempts = await attemptModel
      .find({ studentId })
      .populate("quizId", "title");

    res.json({
      success: true,
      attempts,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attempts" });
  }
};


