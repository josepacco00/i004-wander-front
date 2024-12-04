import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import userServices from "../services/user.services";
import { AuthContext } from "../contexts/auth.context";

import logoWander from "../assets/img/logowander.png";
import menuIcon from "../assets/icons/icon-menu.svg";
import closeIcon from "../assets/icons/icon-close.svg";
import { useNavigate } from "react-router-dom";

function NavBarLayout() {
  const { user, setUser } = useContext(AuthContext); 
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Función para abrir y cerrar el modal de navegación
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await userServices.logOutUser(); 
      setUser(null);
      handleModal();
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // No se mostrará la navegación en la página de login y registro
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <>
      {/* Header superior contenedor del logo y el icono de menú */}
      <header className="w-full p-3 shadow-md">
        <div className="flex items-center justify-between">
          <img src={logoWander} alt="logowander" className="w-10 h-8" />
          <img
            onClick={handleModal}
            src={menuIcon}
            alt="menu"
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      </header>

      {/* Modal de Navegación */}
      {modalOpen && (
        <div
          className="fixed top-0 left-0 z-50 flex justify-end w-screen h-screen bg-black/50"
          onClick={handleModal}
        >
          <nav
            className="flex flex-col bg-white w-[70%] h-full p-3 animate-navbarAnimation pl-10 gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              onClick={handleModal}
              src={closeIcon}
              alt="close icon"
              className="self-end w-6 h-6 cursor-pointer"
            />
            <Link to="/" className="text-xl font-bold" onClick={handleModal}>
              Inicio
            </Link>
            <Link to="/filters" className="text-xl font-bold" onClick={handleModal}>
              Buscar Experiencias
            </Link>
            <Link
              to="user-profile"
              className="text-xl font-bold"
              onClick={handleModal}
            >
              Perfil
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-xl font-bold"
                  onClick={handleModal}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="text-xl font-bold"
                  onClick={handleModal}
                >
                  Registro
                </Link>
              </>
            ) : (
              <p
                className="text-xl font-bold text-left cursor-pointer"
                onClick={handleLogout}
              >
                Cerrar sesión
              </p>
            )}
          </nav>
        </div>
      )}
    </>
  );
}

export default NavBarLayout;
