import imagelogo from "../assets/img/imagelogo.png";
import imageletter from "../assets/img/imageletter.png";
import '../components/LoginForm/LoginForm.css';
import { Link } from "react-router-dom";
import './AuthLayout.css';
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  showText?: boolean;
};

const AuthLayout = ({ children, showText = true }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img className="logo w-[140px] md:w-[180px] h-auto mb-4" src={imagelogo} alt="Logo de Wander" />
          <img className="text-logo w-[100px] md:w-[160px] mb-2" src={imageletter} alt="Texto Wander" />
          {showText && (
            <p className="text-dark text-base font-bold text-center mb-2">
              Explora nuevas aventuras
            </p>
          )}
        </div>

        {children}

        <Link
          to={"/"}
          className="inline-block w-full mt-3 text-center text-primary hover:text-tertiary font-semibold">
          {"<"} Volver a Inicio
        </Link>
      </div>
    </div>
  );
};

export default AuthLayout;