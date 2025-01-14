import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";


type AuthLayoutProps = {
  children: React.ReactNode;
} & Pick<BaseParams, "params">;

export default function AuthLayout({ params: { locale }, children }: AuthLayoutProps) {
  setRequestLocale(locale);

  // Translation
  const t = useTranslations();

return(

<main>
<div className= "container min-vh-75 mb-5 mt-5 d-flex bg-light w-50" >
<div className="row">
<div className="col-md-6 image shadow">
  <div className="text-center">
  <h2 className="text-md-start ms-5">Welcome to</h2>
    <h1 className="text-primary text-md-start ms-5">Elevate</h1>
   <p className="text-md-start ms-5 text">
   Quidem autem voluptatibus qui quaerat aspernatur architecto natus
  </p>
   <img
 src="/bro.png"
className="img-fluid mt-5"
style={{ maxHeight: "250px" }}
   />
    </div>
 </div>

<div className="col-md-6 d-flex justify-content-center align-items-center">
  <div className="w-75">
  <div className="d-flex justify-content-end mt-3 mb">
              <a href="#" className="me-3">English</a>
              <Link className="me-3" href={"/login"}>signup</Link>
              <Link  href={"/auth/register"}>Register</Link>
            </div>

  {children}
  </div>

</div>

 
</div>


  </div>

 
</main>


)



}






