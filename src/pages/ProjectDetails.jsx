import React, { useEffect, useState } from "react";
import { ref, onValue, push, set } from "firebase/database";
import { database, auth } from "../firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskItem from "../components/TaskItem";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", description: "" });
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const projectRef = ref(database, `projects/${user.uid}/${id}`);
    return onValue(projectRef, (snapshot) => {
      setProject(snapshot.val());
    });
  }, [id]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const tasksRef = ref(database, `tasks/${user.uid}/${id}`);
    return onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tasksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTasks(tasksArray);
      } else {
        setTasks([]);
      }
    });
  }, [id]);

  const addTask = () => {
    if (!newTask.name) return;

    const user = auth.currentUser;
    if (!user) return;

    const tasksRef = ref(database, `tasks/${user.uid}/${id}`);
    const newTaskRef = push(tasksRef);

    set(newTaskRef, { ...newTask, done: false });
    setNewTask({ name: "", description: "" });

    setNotification("One new task added!");
    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <div className="project-details-page">
      <Navbar title={project ? project.name : "Project Details"} />

      <div className="content-container">
        {notification && <div className="notification">{notification}</div>}

        <div className="add-task-form">
          <h2>Add New Task</h2>
          <input
            type="text"
            placeholder="Task Name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="input-field"
          />
          <button onClick={addTask} className="add-task-btn">
            Add Task
          </button>
        </div>

        <div className="task-list">
          <h2>Tasks ({tasks.length})</h2>
          {tasks.length === 0 ? (
            <p className="no-tasks">No tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <TaskItem key={task.id} task={task} projectId={id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;