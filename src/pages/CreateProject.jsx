import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { database, auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    if (!name) return;

    const user = auth.currentUser;
    if (!user) return;

    const projectsRef = ref(database, `projects/${user.uid}`);
    const newProjectRef = push(projectsRef);

    await set(newProjectRef, { name, createdAt: new Date().toISOString() });
    setName("");
    navigate("/dashboard");
  };

  return (
    <div id="create-project-page">
      <div className="create-project-container">
        <h2>Create New Project</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="project-input"
        />
        <button onClick={handleCreateProject} className="create-project-btn">
          Create Project
        </button>
      </div>
    </div>
  );
}

export default CreateProject;