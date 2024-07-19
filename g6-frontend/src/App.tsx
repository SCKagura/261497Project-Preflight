import { useEffect, useState } from "react";
import axios from "axios";
import { type TodoItem } from "./types";
import dayjs from "dayjs";
import "./App.css"; // นำเข้าไฟล์ CSS

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [mode, setMode] = useState<"ADD" | "EDIT">("ADD");
  const [curTodoId, setCurTodoId] = useState("");

  async function fetchData() {
    const res = await axios.get<TodoItem[]>("api/todo");
    setTodos(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  function handleDeadlineChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDeadline(e.target.value);
  }

  function handleSubmit() {
    if (!inputText || !deadline) return;
    if (mode === "ADD") {
      axios
        .request({
          url: "/api/todo",
          method: "put",
          data: { todoText: inputText, deadline },
        })
        .then(() => {
          setInputText("");
          setDeadline("");
        })
        .then(fetchData)
        .catch((err) => alert(err));
    } else {
      axios
        .request({
          url: "/api/todo",
          method: "patch",
          data: { id: curTodoId, todoText: inputText, deadline },
        })
        .then(() => {
          setInputText("");
          setDeadline("");
          setMode("ADD");
          setCurTodoId("");
        })
        .then(fetchData)
        .catch((err) => alert(err));
    }
  }

  function handleDelete(id: string) {
    axios
      .delete("/api/todo", { data: { id } })
      .then(fetchData)
      .then(() => {
        setMode("ADD");
        setInputText("");
        setDeadline("");
      })
      .catch((err) => alert(err));
  }

  function handleCancel() {
    setMode("ADD");
    setInputText("");
    setDeadline("");
    setCurTodoId("");
  }

  function handleToggleDone(id: string, currentStatus: boolean) {
    axios
      .patch("/api/todo/done", { id, isDone: !currentStatus })
      .then(fetchData)
      .catch((err) => alert(err));
  }
return (
  <div className="container">
    <header>
      <h1>Todo App</h1>
    </header>
    <main>
      <div style={{ display: "flex", alignItems: "start" }}>
        <input
          type="text"
          onChange={handleChange}
          value={inputText}
          placeholder="Todo"
          disabled={mode === "EDIT" && todos.find((todo) => todo.id === curTodoId)?.isDone}
          data-cy="input-text"
        />
        <input
          type="date"
          onChange={handleDeadlineChange}
          value={deadline}
          placeholder="Deadline"
          disabled={mode === "EDIT" && todos.find((todo) => todo.id === curTodoId)?.isDone}
          data-cy="input-deadline"
        />
        <button onClick={handleSubmit} data-cy="submit">
          {mode === "ADD" ? "Submit" : "Update"}
        </button>
        {mode === "EDIT" && (
          <button onClick={handleCancel} className="secondary">
            Cancel
          </button>
        )}
      </div>
      <div data-cy="todo-item-wrapper">
        {todos.sort(compareDate).map((item, idx) => {
          const { date, time } = formatDateTime(item.createdAt);
          const text = item.todoText;
          const deadlineText = item.deadline;
          return (
            <article
              key={item.id}
              className={`todo-item ${item.isDone ? "done" : ""}`} // เพิ่มคลาส done
            >
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={() => handleToggleDone(item.id, item.isDone)}
                data-cy="todo-item-checkbox"
              />
              <div>({idx + 1})</div>
              <div>📅{date}</div>
              <div>⏰{time}</div>
              <div>📅 Deadline: {deadlineText}</div>
              <div data-cy='todo-item-text'>📰{text}</div>
              <div
                style={{
                  cursor: item.isDone ? "not-allowed" : "pointer",
                  opacity: item.isDone ? 0.5 : 1
                }}
                onClick={() => {
                  if (!item.isDone) {
                    setMode("EDIT");
                    setCurTodoId(item.id);
                    setInputText(item.todoText);
                    setDeadline(item.deadline);
                  }
                }}
                data-cy="todo-item-update"
              >
                {curTodoId !== item.id ? "🖊️" : "✍🏻"}
              </div>
              <div
                className="trash-icon" // ใช้คลาส CSS ที่ถูกต้อง
                onClick={() => handleDelete(item.id)}
                data-cy='todo-item-delete'
              >
                🗑️
              </div>
            </article>
          );
        })}
      </div>
    </main>
  </div>
);

}
  

export default App;

function formatDateTime(dateStr: string) {
  if (!dayjs(dateStr).isValid()) {
    return { date: "N/A", time: "N/A" };
  }
  const dt = dayjs(dateStr);
  const date = dt.format("D/MM/YY");
  const time = dt.format("HH:mm");
  return { date, time };
}

function compareDate(a: TodoItem, b: TodoItem) {
  const da = dayjs(a.createdAt);
  const db = dayjs(b.createdAt);
  return da.isBefore(db) ? -1 : 1;
}
