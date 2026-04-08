import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database, auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const projectsRef = ref(database, `projects/${user.uid}`);
    return onValue(projectsRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const projectsArray = await Promise.all(
          Object.keys(data).map(async (key) => {
            const project = data[key];

            // Hämta antal tasks
            const tasksRef = ref(database, `tasks/${user.uid}/${key}`);
            let taskCount = 0;
            await new Promise((resolve) => {
              onValue(
                tasksRef,
                (taskSnap) => {
                  const tasksData = taskSnap.val();
                  taskCount = tasksData ? Object.keys(tasksData).length : 0;
                  resolve();
                },
                { onlyOnce: true }
              );
            });

            return { id: key, ...project, taskCount };
          })
        );
        setProjects(projectsArray);
      } else {
        setProjects([]);
      }
    });
  }, []);

  return (
    <div id="dashboard">
      <Navbar title="Dashboard" />

      <div className="dashboard-container">
        <button
          onClick={() => navigate("/create-project")}
          className="create-project-btn"
        >
          Create Project
        </button>

        {projects.length === 0 ? (
          <p className="no-projects-text">No projects yet.</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => navigate(`/project/${project.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;