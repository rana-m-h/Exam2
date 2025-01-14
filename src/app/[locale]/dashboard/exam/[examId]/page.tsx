 
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppError from "@/lib/utils/app-error";
import { Triangle } from "react-loader-spinner";
import { useParams } from "next/navigation";
import QuizApp from "../../component/quiz/[quizeId]/page";
import { signOut } from "next-auth/react";

export default function GetExams() {
  const [exams, setExams] = useState([]); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [MenuVisible, setMenuVisible] = useState(false);
  const [search, setSearch] = useState(""); 
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const { examId } = useParams<{ examId: string }>();
  const [PopupVisible, setPopupVisible] = useState(false);


  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" }); 
  };

// Fetch data from API
  useEffect(() => {
    async function fetchExams() {
      try {
        const response = await fetch( `http://localhost:3000/api/exams?subject=${examId}`); // Fetch data from API
        const payload = await response.json();

        if (!response.ok) {
          throw new AppError(payload.message || "Failed to fetch subjects", response.status);
        }

        if (!payload.exams || !Array.isArray(payload.exams)) {
          setError("No subjects found or invalid data.");
          return;
        }

        setExams(payload.exams); 
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");

      }finally {
      setLoading(false);
    }
    }

    fetchExams();
  }, [examId]);


// Filters the quiz list based on the user's search input, ignoring case.
  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(search.toLowerCase())
  );

    // Sets the selected quiz ID to start.
  const openPopup = (examId: string) => {
    setSelectedExamId(examId);
    setPopupVisible(true);
  };


  if (error) {
    return <p>Error: {error}</p>;
  }

  // Toggles the visibility of the side menu.
    const Menu = () => {
      setMenuVisible(!MenuVisible);
    };
  
    // Displays a loading spinner while fetching question
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Triangle height="80" width="80" color="rgba(68,97,242,1)" ariaLabel="triangle-loading" />
        </div>
      );
    }
  
    return (
        <div>
      <div>
        <div className="mobile-header align-items-center justify-content-between bg-primary">
          <div className="">
            <button onClick={Menu}>
              <i className="fa-solid fa-bars me-3 ms-3 Icon"></i>
            </button>
            <i className="fa-solid fa-magnifying-glass Icon"></i>
          </div>
          <div className="div">
            <img className="img mt-2 w-100" src="/img.png" alt="" />
          </div>
        </div>

        <div className={`pb-2 header ${MenuVisible ? 'visible' : ''}`}>
          <div className="mobile-header align-items-center justify-content-between">
            <div className="">
              <img className="mt-4 logo w-75" src="/Logo2.png" alt="" />
            </div>
            <div className="">
              <button className="close-btn me-5 mt-3 " onClick={Menu}>
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
          </div>

          <ul className="mt-5 ms-3">
            <li className="mb-4">
              <Link href="/dashboard" className="font button">
                <i className="fa-solid fa-house me-2 icon"></i> Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/history" className="font button">
                <i className="fa-regular fa-clock me-2 icon"></i> Quiz History
              </Link>
            </li>
            <li className="mb-4">
            <button 
                className="font "
                onClick={handleLogout}>
                  <i className="fa-solid fa-arrow-right-from-bracket me-2 icon"></i> Log Out
                </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex">
        <div className="p-4 display">
          <div className="mt-4">
            <img src="/Logo2.png" alt="" />
          </div>
          <ul className="margin">
            <li className="mt-5">
              <Link href="/dashboard/subjects" className="font">
                <i className="fa-solid fa-house me-2 icon"></i> Dashboard
              </Link>
            </li>
            <li className="mt-5">
              <Link href="/history" className="font">
                <i className="fa-regular fa-clock me-2 icon"></i> Quiz History
              </Link>
            </li>
            <li className="mt-5">
            <button 
                className="font "
                onClick={handleLogout}>
                  <i className="fa-solid fa-arrow-right-from-bracket me-2 icon"></i> Log Out
                </button>
            </li>
          </ul>
        </div>

        <div className="container">
          <div className="main-content">
            <div className="d-flex justify-content-between align-items-center">
              <input
                type="text"
                className="form-control search-bar me-3 rounded-5 shadow pt-3 pb-3 border-0 ps-4"
                placeholder="Search Quiz"
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
              <button className="btn btn-primary width btn-sm rounded-4 pt-2 pb-2">Start Quiz</button>
              <img className="user-avatar mt-3" src="/img.png" alt="" />
            </div>

            <div className="quiz-section">
              <h5>Front-End Quiz</h5>
              <div>
              {filteredExams.length === 0 ? (
                  <p>No quizzes found.</p>
                ) : (
                    filteredExams.map((exam: any) => (
                    <div key={exam._id} className="quiz-item mt-4 d-flex justify-content-between align-items-center">
                      <div className="quiz-details">
                        <h6>{exam.title}</h6>
                        <p>{exam.numberOfQuestions} Questions</p>
                      </div>
                      <div className="text-center">
                        <p>{exam.duration} Minutes</p>
                        <button className="btn btn-primary rounded-5 ps-5 pe-5"
                          onClick={() => openPopup(exam._id)}>Star</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          
          {PopupVisible && selectedExamId && (
             // Displays the selected quiz using the `QuizApp` component.
            <div className="popup-overlay">
              <div className="popup-content ">
                <QuizApp quizeId={selectedExamId} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    );
  }
