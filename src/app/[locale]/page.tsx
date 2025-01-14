import LoginForm from "./auth/login/_components/login.form";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";


export default function Page(){
    return <div className="container min-vh-75 mb-5 mt-5 d-flex bg-light  w-50 ">
    <div className="row ">
      <div className="col-md-6 image shadow ">
        <div className="text-center">
          <h2 className="text-md-start ms-5">Welcome to</h2>
          <h1 className="text-primary text-md-start ms-5">Elevate</h1>
          <p className="text-md-start ms-5 text">
          Quidem autem voluptatibus qui quaerat aspernatur architecto natus
          </p>
          <img
           src="/bro.png"
            alt="Illustration"
            className="img-fluid"
            style={{ maxHeight: '300px' }}
          />
        </div>
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="w-75">
          <div className="d-flex justify-content-end mb-5">
            <a href="#" className="me-3">English</a>
            <Link className="me-3 " href={"/login"}>signin</Link>
            <Link href={"/auth/register"}>Register</Link>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
} 