import imagelogo from "../assets/img/imagelogo.png";
import imageletter from "../assets/img/imageletter.png";
import '../components/LoginForm/LoginForm.css';
import { Link } from "react-router-dom";
import './AuthLayout.css';
import { ReactNode } from "react";

type Props = {
  children: ReactNode; // Aquí cambiamos JSX.Element por ReactNode
  showText?: boolean; // Prop opcional para mostrar el texto
};

<<<<<<< HEAD
const AuthLayout = ({ children, showText = true }: Props) => { // Por defecto, el texto se mostrará
  return (
    <div className="flex min-h-screen items-center justify-center font-sans p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img className="logo" src={imagelogo} alt="Logo de Wander" />
          <img className="text-logo" src={imageletter} alt="Texto Wander" />
          {showText && ( // Mostrar texto solo si "showText" es true
            <p className="text-dark text-base font-bold text-center mb-2">
              Explora nuevas aventuras
            </p>
          )}
=======
const AuthLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center font-sans p-6">
            <div className="flex flex-col items-center mb-6">
                <img 
                    className="logo w-[140px] md:w-[180px] mb-4"
                    src={imagelogo} alt="Logo de Wander" />
                <img
                    className="text-logo w-[100px] md:w-[160px] mb-2"
                    src={imageletter} alt="Texto Wander" />
                <p className="text-black text-base max-sm:text-sm font-bold text-center">
                    Explora nuevas aventuras
                </p>
            </div>

            <>
                {children}
            </>

            <Link
                to={"/"}
                className="inline-block w-full mt-3 text-center text-primary hover:text-tertiary font-semibold">
                {"<"} Volver a Inicio
            </Link>
>>>>>>> develop
        </div>

        {/* Aquí mostramos los hijos que se pasen al AuthLayout */}
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
