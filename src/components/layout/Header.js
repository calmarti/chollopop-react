import "./Header.css";
import Button from "../shared/Button";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../auth/context";
import Modal from "../shared/Modal";

export default function Header({ history, ...props }) {
  const [isModalOn, setIsModalOn] = useState(false);

  const modalProps = {
    isModalOn: isModalOn,

    modalMessage: "¿Realmente quieres cerrar la sesión?",

    showModal: () => {
      setIsModalOn(true);
    },

    hideModal: () => {
      setIsModalOn(false);
    },
  };

  const { isLogged, handleLogout } = useContext(AuthContext);

  const handleRedirect = () => {
    history.push("/adverts/new");
  };

  const logoutConfirmation = () => {
    modalProps.showModal();
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <Link className="header-link" to="/">
          <div className="logo">Logo</div>
        </Link>
        <Link className="header-link" to="/">
          Home
        </Link>
        {isLogged ? (
          <>
            <Button className="header-button" onClick={logoutConfirmation}>
              Salir
            </Button>
            <Modal handleClick={handleLogout} {...modalProps} />

            <Button className="header-button" onClick={handleRedirect}>
              Crear anuncio
            </Button>
          </>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
}
