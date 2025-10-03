import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext.js";
import logo from '../../logo.png';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // після виходу → на головну
  };

  return (
    <div className="Header">
      <header className="Header-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
              <div className="Header-logo-container">
                <Link to="/" className="Header-main-link">
                  <img src={logo} className="Header-logo" alt="logo" />
                </Link>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 text-end">
      {isAuthenticated ? (
        <>
          <span className="me-3">Доброго дня, {user}</span>
          <Link to="/todo-list" className="Header-link me-3">
            ToDo
          </Link>
          <Link to="/" className="Header-link" onClick={handleLogout}>
                  Вийти
                </Link>
        </>
      ) : (
        <Link to="/login" className="Header-link">
          Вхід
        </Link>
      )}
    </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;