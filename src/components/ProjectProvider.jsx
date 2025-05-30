import { useCallback, useEffect, useState, useMemo } from "react";
import { ProjectContext } from "../contexts/ProjectContext";
import { getData } from "../firebase";
import { useLocation } from "react-router-dom";

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getData("projects", "createdAt");
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects.");
      console.error("Failed to load project: ", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [location.pathname, fetchProjects]);

  const contextValue = useMemo(
    () => ({
      projects,
      loading,
      error,
      refreshProjects: fetchProjects,
    }),
    [projects, loading, error, fetchProjects],
  );

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};
