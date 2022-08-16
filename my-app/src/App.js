import "./App.css";
import { useState, useRef, useEffect } from "react";
import TaskList from "./components/TaskList";
import Button from "./components/Button";

const LOCAL_STORAGE_KEY = "todoApp.todos";
function App() {
  const [tasks, setTasks] = useState([]);
  const tasksRef = useRef();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTasks() {
    let taskName = tasksRef.current.value;
    let id = Math.floor(Math.random() * 10000);
    if (taskName === "") return alert("Please Add a Task");

    setTasks((prevTodos) => {
      return [...tasks, { id: id, name: taskName, complete: false }];
    });
    tasksRef.current.value = null;
  }

  function toggleTask(id) {
    const newTasks = [...tasks];
    const task = newTasks.find((task) => task.id === id);
    task.complete = !task.complete;
    setTasks(newTasks);
  }

  function removeTasks() {
    const newTasks = tasks.filter((task) => !task.complete);
    setTasks(newTasks);
  }

  function removeAllTasks() {
    setTasks([]);
  }

  function clearStorage() {
    localStorage.clear();
    alert("Storage has been cleared, refresh the page to see the results");
  }

  return (
    <div className="container">
      <h1 className="project-title">Task Tracker</h1>
      {tasks.length === 0 ? (
        ""
      ) : (
        <h1 classname="total-tasks">
          {tasks.filter((task) => !task.complete).length} left to do
        </h1>
      )}

      <input className="input-field" ref={tasksRef} placeholder="Add Task..." />
      <Button
        beColor="#35CF79"
        textColor="white"
        onClick={addTasks}
        text="Add Task"
        bottom="79px"
        right="95px"
      />
      <Button
        beColor="#1183F5"
        textColor="white"
        onClick={removeTasks}
        text="Remove a task"
        bottom="109px"
        right="-95px"
      />
      <Button
        beColor="#F7440B"
        textColor="white"
        onClick={removeAllTasks}
        text="Delete All Tasks"
        bottom="79px"
        right="95px"
      />
      <Button
        beColor="#F7CA0B"
        textColor="black"
        onClick={clearStorage}
        text="Clear Storage"
        bottom="109px"
        right="95px"
      />
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} toggleTask={toggleTask} />
      ) : (
        "No tasks to show"
      )}
    </div>
  );
}

export default App;
