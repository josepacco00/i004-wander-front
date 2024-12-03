import imagelogo from "../assets/img/imagelogo.png";
import imageletter from "../assets/img/imageletter.png";
import { Link } from "react-router-dom";
import './AuthLayout.css';
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  showText?: boolean; // Esto controla si mostrar el texto o no
  logoClassName?: string; // Permite pasar una clase personalizada para la imagen del logo
  showBackButton?: boolean; // Nuevo prop para controlar la visibilidad del botón "Volver al inicio"
  showTextImage?: boolean; // Nuevo prop para controlar la visibilidad del texto en la imagen del texto del logo
};

const AuthLayout = ({ children, showText = true, showTextImage = true, logoClassName, showBackButton = true }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          {/* Permite pasar una clase personalizada para la imagen del logo */}
          <img className={`logo h-auto mb-4 ${logoClassName}`} src={imagelogo} alt="Logo de Wander" />
          
          {showTextImage && (
            <img className="text-logo mb-2" src={imageletter} alt="Texto Wander" />
          )}
          
          {showText && (
            <p className="text-dark text-base font-bold text-center mb-2">
              Explora nuevas aventuras
            </p>
          )}
        </div>

        {children}

        {/* Mostrar el botón solo si showBackButton es true */}
        {showBackButton && (
          <Link
            to={"/"}
            className="inline-block w-full mt-3 text-center text-primary hover:text-tertiary font-semibold">
            {"<"} Volver a Inicio
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;