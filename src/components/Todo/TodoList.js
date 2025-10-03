import { useState, useEffect } from "react";
import axios from "axios";
import check from "../../images/check.svg";
import dt from "../../images/delete.svg";
import edit from "../../images/edit.svg";
import "./TodoList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Компонент однієї задачі (картка)
function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
      <div className="block position-relative">
        <div>
          <h5>
            <img src={check} alt="check" /> {task.title}
          </h5>
          <div className="todo-status d-flex gap-2 my-2">
            <span
              className={`badge ${
                task.difficulty === "easy"
                  ? "bg-success"
                  : task.difficulty === "medium"
                  ? "bg-warning text-dark"
                  : "bg-danger"
              }`}
            >
              {task.difficulty === "easy"
                ? "Легка"
                : task.difficulty === "medium"
                ? "Середня"
                : "Тяжка"}
            </span>
            <span
              className={`badge ${
                task.status === "done"
                  ? "bg-success"
                  : task.status === "active"
                  ? "bg-primary"
                  : "bg-secondary"
              }`}
            >
              {task.status === "done"
                ? "Виконана"
                : task.status === "active"
                ? "Активна"
                : "Не активна"}
            </span>

            
          </div>
          <p className="mb-0">{task.description || "Опис відсутній"}</p>
          <div className="Button-todo">
            <button
              className="Button"
              onClick={() => onEdit(task)}
              data-bs-toggle="modal"
              data-bs-target="#taskModal"
            >
              <img src={edit} alt="edit" />
            </button>
            <button className="Button" onClick={() => onDelete(task.id)}>
              <img src={dt} alt="delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Головний компонент
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    difficulty: "",
    status: "inactive",
  });

  // Завантаження задач
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks").then((res) => setTasks(res.data));
  }, []);

  // Обробка інпутів
  const handleChange = (e) => {
    const { id, type, value } = e.target;

    if (["easy", "medium", "hard"].includes(id)) {
      setForm({ ...form, difficulty: id });
    } else if (["active", "inactive", "done"].includes(id)) {
      setForm({ ...form, status: id });
    } else {
      setForm({ ...form, [id]: type === "checkbox" ? e.target.checked : value });
    }
  };

  // Створення/Редагування задачі
  const handleSubmit = async () => {
    if (!form.title.trim()) return alert("Введіть назву задачі!");

    if (editing) {
      const res = await axios.put(`http://localhost:5000/api/tasks/${form.id}`, form);
      setTasks(tasks.map((t) => (t.id === form.id ? res.data : t)));
    } else {
      const res = await axios.post("http://localhost:5000/api/tasks", form);
      setTasks([...tasks, res.data]);
    }

    setForm({ id: null, title: "", description: "", difficulty: "", status: "inactive" });
    setEditing(false);
  };

  // Видалення
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Натиснули "Редагувати"
  const handleEdit = (task) => {
    setForm(task);
    setEditing(true);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="Todo-text-block text-center">
            <h2>
              Доброго дня <span>Admin</span>
            </h2>
            <p>Нижче наведено повний список задач для вас, котрі потрібно виконати</p>

            {/* Кнопка створення */}
            <div className="Todo-link-block d-flex justify-content-center text-center text-center">
              <a
                href="#"
                className="Header-link"
                data-bs-toggle="modal"
                data-bs-target="#taskModal"
                onClick={() => {
                  setEditing(false);
                  setForm({
                    id: null,
                    title: "",
                    description: "",
                    difficulty: "",
                    status: "inactive",
                  });
                }}
              >
                Створити завдання
              </a>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div className="modal fade" id="taskModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h3 className="modal-title w-100 text-center fw-bold">
                  {editing ? "Редагувати To Do" : "Новий To Do"}
                </h3>
              </div>

              <div className="modal-body">
                <form>
                  <div>
                    <label htmlFor="title" className="form-label fw-semibold">
                      Назва
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={form.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="form-label fw-semibold">
                      Опис задачі
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="3"
                      value={form.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="Hard-level">
                    <label className="form-label fw-semibold">Складність задачі</label>
                    <div className="d-flex gap-3">
                      {["easy", "medium", "hard"].map((lvl) => (
                        <div className="form-check" key={lvl}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={lvl}
                            checked={form.difficulty === lvl}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor={lvl}>
                            {lvl === "easy" ? "Легка" : lvl === "medium" ? "Середня" : "Тяжка"}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="Hard-level">
                    <label className="form-label fw-semibold">Статус</label>
                    <div className="d-flex gap-3">
                      {["active", "inactive", "done"].map((st) => (
                        <div className="form-check" key={st}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={st}
                            name="status"
                            checked={form.status === st}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor={st}>
                            {st === "active"
                              ? "Активна"
                              : st === "inactive"
                              ? "Не активна"
                              : "Виконана"}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="popup-btn d-flex justify-content-end gap-2 mt-3">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                      Відміна
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                      data-bs-dismiss="modal"
                    >
                      {editing ? "Зберегти" : "Зберегти"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks list */}
      {tasks.length > 0 && (
        <div className="Todo-items mt-4">
          <div className="row">
            <div className="col-xl-4 col-md-6 col-sm-12 col-12">
              <div className="Item-head">Всі задачі</div>
            </div>
          </div>
          <div className="row pt-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </div>
        </div>
      )}

      {/* Активні */}
      {tasks.filter((t) => t.status === "active").length > 0 && (
        <div className="Todo-items mt-4">
          <div className="row">
            <div className="col-xl-4 col-md-6 col-sm-12 col-12">
              <div className="Item-head">Активні</div>
            </div>
          </div>
          <div className="row pt-4">
            {tasks
              .filter((task) => task.status === "active")
              .map((task) => (
                <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
              ))}
          </div>
        </div>
      )}

      {/* Не активні */}
      {tasks.filter((t) => t.status === "inactive").length > 0 && (
        <div className="Todo-items mt-4">
          <div className="row">
            <div className="col-xl-4 col-md-6 col-sm-12 col-12">
              <div className="Item-head">Не активні</div>
            </div>
          </div>
          <div className="row pt-4">
            {tasks
              .filter((task) => task.status === "inactive")
              .map((task) => (
                <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
              ))}
          </div>
        </div>
      )}

      {/* Виконані */}
      {tasks.filter((t) => t.status === "done").length > 0 && (
        <div className="Todo-items mt-4">
          <div className="row">
            <div className="col-xl-4 col-md-6 col-sm-12 col-12">
              <div className="Item-head">Виконані</div>
            </div>
          </div>
          <div className="row pt-4 todo-done">
            {tasks
              .filter((task) => task.status === "done")
              .map((task) => (
                <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TodoList;
