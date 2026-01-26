import express from 'express';
import auth from '../middleware/auth.js';
import authRole from '../middleware/authRole.js';
import { addQuestion, createQuiz, getInstructorQuizzes, getMyAttempts, getQuizQuestions, getQuizResult, getQuizResultsForInstructor, getQuizzes, submitQuestion, togglePublishQuiz } from '../controllers/quizController.js';

const quizRouter = express.Router();

quizRouter.post('/create',auth,authRole,createQuiz);
quizRouter.post('/:id/question',auth,authRole,addQuestion);
quizRouter.get('/quizzes',auth,getQuizzes);
quizRouter.post('/:id/submit',auth,submitQuestion)
quizRouter.get('/:id/questions',auth,getQuizQuestions);
quizRouter.get('/:id/result',auth,getQuizResult);
quizRouter.patch('/:id/publish',auth,authRole,togglePublishQuiz)
quizRouter.get("/instructor/quizzes",auth,authRole,getInstructorQuizzes);
quizRouter.get("/:id/results",auth,authRole,getQuizResultsForInstructor);
quizRouter.get("/my/attempts",auth,getMyAttempts);



export default quizRouter;