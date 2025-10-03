import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import LoginPage from "./LoginPage.js";
import { AuthProvider } from "../src/AuthContext.js";
import TodoList from "./components/Todo/TodoList.js";
import PrivateRoute from "./PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <Routes>
            {/* Головна */}
            <Route
              path="/"
              element={
                <div className="row">
                  <div className="col text-center">
                    <div className="main-content">
                      <h1>
                        Мій <span>ToDo list</span>
                      </h1>
                      <p>
                        Наш туду-ліст створений для тих, хто хоче впорядкувати свій день і досягати більшого без зайвого хаосу. Тепер усі завдання, ідеї та плани зберігаються в одному місці, де їх легко переглядати та оновлювати. Додавай нові справи всього у кілька кліків, групуй їх за пріоритетами, став нагадування та відмічай виконане. Простий і зрозумілий інтерфейс допоможе зосередитися на головному, а продуманий дизайн зробить щоденне планування приємною звичкою. Використовуй туду-ліст для роботи, навчання чи особистих справ і відчуй, наскільки організованим може стати твій день.
                      </p>
                    </div>
                  </div>
                </div>
              }
            />

            {/* Логін */}
            <Route path="/login" element={<LoginPage />} />

            {/* ToDo тільки для авторизованих */}
            <Route
              path="/todo-list"
              element={
                <PrivateRoute>
                  <TodoList />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
