
 "use client";

import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AppError from "@/lib/utils/app-error";
import { Triangle } from "react-loader-spinner";

// Prop type definition: ID of the quiz.
interface QuizAppProps {
    quizeId: string;
  }
  
  export default function QuizApp({ quizeId }: QuizAppProps) {
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [answeredQuestions, setAnsweredQuestions] = useState<{ [key: number]: boolean }>({});
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [time, setTime] = useState(900); 
    const [loading, setLoading] = useState(true);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState(false);
  
// Fetch data from API
   useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await fetch( `http://localhost:3000/api/questions?exam=${quizeId}`); 
        const payload = await response.json();
        console.log("response" , response)

        if (!response.ok) {
          console.error("Failed to fetch questions:", payload);
           throw new AppError(payload.message || "Failed to fetch subjects", response.status);
        }
    

        if (!payload.questions || !Array.isArray(payload.questions)) {
          setError(err.message || "No subjects found or invalid data.");
          return;
        }

     

        setQuestions(payload.questions);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizeId]);


  // Timer logic: Decrements time every second and completes the quiz if time runs out.
  useEffect(() => {
    if (time === 0) {
      // Mark quiz as completed when time runs out.
      setQuizCompleted(true); 
    }

    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); 
  }, [time]);

   // Handles selecting an answer for the current question.
  const handleAnswerSelect = (key: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: key,
    }));
  };

   // Handles advancing to the next question or finishing the quiz.
  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (!answeredQuestions[currentQuestionIndex] && selectedAnswers[currentQuestionIndex]) {
      const answerIsCorrect = selectedAnswers[currentQuestionIndex] === currentQuestion.correct;
      if (answerIsCorrect) {
        setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
      }

     // Mark the current question as answered.
      setAnsweredQuestions((prev) => ({
        ...prev,
        [currentQuestionIndex]: true,
      }));
    }

  // Move to the next question or mark the quiz as completed.
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true); 
    }
  };

 // Handles returning to the previous question.
  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  // Filters out incorrect questions to show them in the results.
  const incorrectQuestions = questions.filter(
    (q, index) =>
      selectedAnswers[index] !== q.correct && answeredQuestions[index]
  );


  // Displays a loading spinner while fetching question
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Triangle
          height="80"
          width="80"
          color="blue"
          ariaLabel="triangle-loading"
        />
      </div>
    );
  }

  // Handles case where no questions are available.
  if (questions.length === 0) {
    return (
      <div className="container">
        <div className="text-center mt-5 shadow bg-info p-5">
          <h4 className="">..No questions</h4>
        </div>
      </div>
    );
  }

   // Handles quiz completion.
  if (quizCompleted) {
 const percentage = Math.round((score.correct / questions.length) * 100);

 // Show detailed results with correct and incorrect answers highlighted.
  if (showResults) {
return (
 <div className="container">
 <div className="results-popup fixed inset-0 d-flex justify-content-center align-items-center bg-black bg-opacity-50">
 <div
 className="bg-white rounded-lg shadow-lg p-3 w-100 max-w-4xl "
 style={{ maxHeight: "80vh", overflow: "auto" }} >
 <div className="row">
 {questions.map((question, index) => {
  const userAnswer = selectedAnswers[index];
 const isCorrect = userAnswer === question.correct;
  if (isCorrect) return null;
      
 return (
 <div key={index} className="col-md-6 mb-3 ps-3">
  <div className="p-3 border rounded shadow-sm">
  <h5 className="mb-3">{question.question}</h5>
{question.answers.map((answer: any) => {
 const isUserAnswer = userAnswer === answer.key;
 const isCorrectAnswer = question.correct === answer.key;
      
 return (
  <div
 key={answer.key}
 className={`form-check ps-5  ${
   isCorrectAnswer
 ? "bg-success bg-opacity-25 border-success"
  : isUserAnswer
  ? "bg-danger bg-opacity-25 border-danger "
 : "bg-light"
 } rounded p-2`} >
 <input
   className="form-check-input"
   type="radio"
      checked={isUserAnswer}
   readOnly />
   <label
 className={`form-check-label  ${
  isCorrectAnswer
      ? "text-success"
    : isUserAnswer
     ? "text-danger"
      : "text-muted"
   }`} >
 {answer.answer}
</label>
</div>
);
})}
</div>
</div>
);
})}
</div>
      
  <div className="text-center mt-3">
   <button
  className="btn btn-primary w-75 rounded-4"
     onClick={() => window.location.reload()}>Close</button>
  </div>
  </div>
    </div>
  </div>
);
};
      
      
    

    return (
      <div className="d-flex justify-content-center align-items-center">
    <div className="bg-white rounded-4 shadow-lg p-6 w-100 max-w-md text-center">
          <h2 className="text-xl  mb-4">Your score</h2>
   <div className="d-flex justify-content-center align-items-center mb-4">
        <div style={{ width: 120, height: 120 }}>
     <CircularProgressbar
           value={percentage}
           text={`${percentage}%`}
                styles={buildStyles({
     textColor: "#000",
                  pathColor: "#0D6EFD",
   trailColor: "#FF4D4D",
               textSize: "16px",
       })}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center aling-items-center gap-6 mb-6">
            <div>
              <p className="text-blue-500 font-medium">Correct</p>
      <p className="text-xl font-bold text-blue-500">{score.correct}</p>
            </div>
            <div>
              <p className="text-red-500 font-medium">Incorrect</p>
              <p className="text-xl font-bold text-red-500">{score.incorrect}</p>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-4">
            <button
              className="btn btn-outline-primary py-2 w-50 px-4 rounded-5 me-3 text-blue-400"
              onClick={() => window.location.reload()}>Back</button>

             <button
              className={`btn py-2 w-50 px-4 text-white rounded-5 ${score.correct === 0 && score.incorrect === 0 ? 'disabled btn-secondary' : 'btn-primary'}`}
              onClick={() => setShowResults(true)}
              disabled={score.correct === 0 && score.incorrect === 0}>Show results</button>
          </div>
        </div>
      </div>
    );
  }

  // Handles the main quiz interface for answering questions.
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz d-flex justify-content-center aling-items-center">
      <div className="bg-white rounded-4 shadow p-6 w-100 max-w-md">
        <div className="d-flex justify-content-between aling-items-center mb-4">
          <span className="text-sm text-blue-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span
            className={`text-sm font-medium ${
              time <= 60 ? "text-red-600" : "text-green-600"
            }`}
          >
            <i className="fa-regular fa-clock"></i> {Math.floor(time / 60)}:{time % 60}
          </span>
        </div>

        <div className="d-flex justify-content-center aling-items-center gap-2 mb-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${
                index < currentQuestionIndex
                  ? "bg-blue-500"
                  : index === currentQuestionIndex
                  ? selectedAnswers[currentQuestionIndex]
                    ? "bg-blue-500"
                    : "bg-gray-300"
                  : "bg-gray-300"}`}></div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">{currentQuestion.question}</h2>
          <div className="space-y-3">
            {currentQuestion.answers.map((answer: any) => (
              <label
                key={answer.key}
                className={`flex items-center p-3 rounded-4 border ${
                  selectedAnswers[currentQuestionIndex] === answer.key
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray bg-gray-50"}`}>
                <input
                  type="radio"
                  name="option"
                  value={answer.key}
                  className="form-radio text-blue-600"
                  onChange={() => handleAnswerSelect(answer.key)}
                  checked={selectedAnswers[currentQuestionIndex] === answer.key}/>
                <span className="ml-3">{answer.answer}</span>
              </label>
            ))}
          </div>

          <div className="d-flex justify-content-between mt-6">
            <button
              className="btn btn-outline-primary py-2 w-50 px-4 rounded-5 me-3 text-blue-400"
              disabled={currentQuestionIndex === 0}
              onClick={handlePrevQuestion}>Back</button>

            <button
              className={`py-2 px-4 rounded-5 w-50 text-white ms-3 ${
                selectedAnswers[currentQuestionIndex]
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"}`}
              onClick={handleNextQuestion}
              disabled={!selectedAnswers[currentQuestionIndex]}>
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}