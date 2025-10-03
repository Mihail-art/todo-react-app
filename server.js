const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, "tasks.json");

let tasks = [];
let id = 1;

// Функція для збереження у файл
function saveTasks() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}

// Завантаження з файла при старті
if (fs.existsSync(DATA_FILE)) {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  try {
    tasks = JSON.parse(data);
    if (tasks.length > 0) {
      id = Math.max(...tasks.map((t) => t.id)) + 1;
    }
  } catch (e) {
    console.error("Помилка читання JSON:", e);
  }
}

// Отримати всі завдання
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Створити нове завдання
app.post("/api/tasks", (req, res) => {
  const { title, description, difficulty, status } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTask = {
    id: id++,
    title,
    description: description || "",
    difficulty: difficulty || "easy",
    status: status || "inactive",
  };

  tasks.push(newTask);
  saveTasks(); // ✅ збереження
  res.status(201).json(newTask);
});

// Змінити існуюче
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, difficulty, status } = req.body;

  const index = tasks.findIndex((t) => t.id == id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  tasks[index] = {
    ...tasks[index],
    title: title || tasks[index].title,
    description: description || tasks[index].description,
    difficulty: difficulty || tasks[index].difficulty,
    status: status || tasks[index].status,
  };

  saveTasks(); // ✅ збереження
  res.json(tasks[index]);
});

// Видалити
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id != id);
  saveTasks(); // ✅ збереження
  res.json({ message: "Task deleted" });
});

// Запуск
app.listen(5000, () => console.log("Server running on http://localhost:5000"));