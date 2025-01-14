 
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppError from "@/lib/utils/app-error";
import { Triangle } from "react-loader-spinner";
import { useRouter } from "next/navigation";  
import { signOut } from "next-auth/react";


export default function GetQuizForm() {
  const [subjects, setSubjects] = useState([]); 
  const [logout, setLogOut] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [MenuVisible, setMenuVisible] = useState(false);
  const [search, setSearch] = useState(""); 
  const router = useRouter();



  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" }); 
  };

// Fetch data from API
  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await fetch("http://localhost:3000/api/subjects"); 
        const payload = await response.json();

        if (!response.ok) {
          throw new AppError(payload.message || "Failed to fetch subjects", response.status);
        }

        if (!payload.subjects || !Array.isArray(payload.subjects)) {
          setError("No subjects found or invalid data.");
          return;
        }

        setSubjects(payload.subjects); 
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");

      }finally {
      setLoading(false);
    }
    }

    fetchSubjects();
  }, []);


  

  if (error) {
    return <p>Error: {error}</p>;
  }

  
    // Toggles the visibility of the menu 
    const Menu = () => {
      setMenuVisible(!MenuVisible);
    };
  // Filters the subjects based on the search input.
    const filteredQuizes = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(search.toLowerCase()) 
    );
  
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
                <button className="close-btn me-5 mt-3" onClick={Menu}>
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
            </div>
  
            <ul className="mt-5 ms-3">
              <li className="mb-4">
                <Link href="/dashboard" className="font">
                  <i className="fa-solid fa-house me-2 icon"></i> Dashboard
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/history" className="font ">
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
            <div className="mt-3">
              <img src="/Logo2.png" alt="" />
            </div>
            <ul className="mt-5">
              <li className="mb-5">
                <Link href="/dashboard/subjects" className="font">
                  <i className="fa-solid fa-house me-2 icon"></i> Dashboard
                </Link>
              </li>
              <li className="mb-5">
                <Link href="/history" className="font">
                  <i className="fa-regular fa-clock me-2 icon"></i> Quiz History
                </Link>
              </li>
              <li className="mb-5">
                <button 
                className="font"
                onClick={handleLogout}>
                  <i className="fa-solid fa-arrow-right-from-bracket me-2 icon"></i> Log Out
                </button>
               
                  
              </li>
           
            </ul>
          </div>
  
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <input
                type="text"
                className="form-control search-bar me-3 rounded-5 shadow pt-3 pb-3 border-0 ps-4"
                placeholder="Search Quiz"
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
              <button className="btn btn-primary width btn-sm rounded-4 pt-2 pb-2">Start Quiz</button>
              <img className="user-avatar mt-3" src="/img.png" alt="" />
            </div>
  
            <div className="shadow me-5 pb-4 pt-4 rounded-4">
              <div className="container">
                <h5 className="mb-4 text-primary">Quizes</h5>
                 <div className="row gy-3">
                 {filteredQuizes.length === 0 ? (
                  <div>No quizzes found </div>
                ) : (
                  filteredQuizes.map((subject: any) => (
                  <div key={subject._id} className="col-md-4">
                    <div className="quize position-relative">
                      <Link href={`/dashboard/exam/${subject._id}`}>
                        <img
                          src={subject.icon}
                          alt={subject.name}
                          className="w-100 rounded"
                        />
                        <div className="position-absolute bottom-8 w-75 ms-5 text-white p-2 text-center style">
                          <h6>{subject.name}</h6>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
