import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import './LoginPage.css';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/todo-list");
    } else {
      setError("Невірний логін або пароль");
    }
  };

  return (
    <div className="form-container d-flex justify-content-center align-items-center">
      <div className="form-block">
        <div className="forms">
          <h2>Вхід</h2>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="login" className="form-label">Логін</label>
              <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            </div>

            <div>
              <label htmlFor="password" className="form-label">Пароль</label>
              <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>

            <button type="submit" className="btn btn-primary mt-3 w-100">
              Вхід
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
