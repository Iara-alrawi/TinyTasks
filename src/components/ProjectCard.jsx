import React, { useState, useEffect } from "react";

function ProjectCard({ project, onClick }) {
  const [pop, setPop] = useState(false);

  useEffect(() => {
    setPop(true);
    const timer = setTimeout(() => setPop(false), 300);
    return () => clearTimeout(timer);
  }, [project.taskCount]); // Trigger när taskCount ändras

  return (
    <div className="project-card" onClick={onClick}>
      <h3>{project.name}</h3>
      <p className="project-date">
        Created: {new Date(project.createdAt).toLocaleDateString()}
      </p>
      <p className={`project-tasks ${pop ? "pop" : ""}`}>
        {project.taskCount} tasks
      </p>
    </div>
  );
}

export default ProjectCard;