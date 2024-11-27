import imagelogo from "../assets/img/imagelogo.png";
import imageletter from "../assets/img/imageletter.png";
import '../components/LoginForm/LoginForm.css';
import { Link } from "react-router-dom";

type Props = {
    children: JSX.Element
}

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
        </div>
    );
};

export default AuthLayout;
