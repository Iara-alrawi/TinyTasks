import React, { useState } from "react";
import { ref, update, remove } from "firebase/database";
import { database, auth } from "../firebase/firebaseConfig";

function TaskItem({ task, projectId }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  const user = auth.currentUser;
  if (!user) return null;

  const taskPath = `tasks/${user.uid}/${projectId}/${task.id}`;

  const toggleDone = () => update(ref(database, taskPath), { done: !task.done });
  const handleSave = () => {
    update(ref(database, taskPath), { name, description });
    setEditing(false);
  };
  const handleDelete = () => remove(ref(database, taskPath));

  return (
    <div className="task-item">
      <div className="task-content">
        {editing ? (
          <>
            <input value={name} onChange={(e) => setName(e.target.value)} className="task-input" />
            <input value={description} onChange={(e) => setDescription(e.target.value)} className="task-input" />
          </>
        ) : (
          <>
            <h3 className={`task-name ${task.done ? "done" : ""}`}>{task.name}</h3>
            <p className="task-desc">{task.description}</p>
          </>
        )}
      </div>

      <div className="task-actions">
        <button onClick={toggleDone} className={`btn btn-status`}>
          {task.done ? "Done" : "Not Done"}
        </button>
        {editing ? (
          <button onClick={handleSave} className="btn btn-save">Save</button>
        ) : (
          <button onClick={() => setEditing(true)} className="btn btn-edit">Edit</button>
        )}
        <button onClick={handleDelete} className="btn btn-delete">Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;