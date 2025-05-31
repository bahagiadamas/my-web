import { IoAdd, IoAddOutline } from "react-icons/io5";

import Container from "../../components/Container";
import SearchBar from "../../components/SearchBar";
import Alert from "../../components/Alert";
import Modal from "../../components/Modal";

import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import { useProjects } from "../../contexts/ProjectContext";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminPage() {
  const {
    projects,
    loading: projectsLoading,
    refreshProjects,
    error,
  } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logout, isLoggingOut } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  const [alertInfo, setAlertInfo] = useState(null);

  const filteredProjects = useMemo(() => {
    if (!searchTerm) {
      return projects;
    }
    return projects.filter(
      (project) =>
        project.id.includes(searchTerm) ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.body &&
          project.body.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [projects, searchTerm]);

  const handleSearch = (query) => {
    setSearchTerm(query.toLowerCase());
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteClick = (projectId, projectTitle) => {
    if (typeof projectId === "string" && projectId.length > 0) {
      setProjectIdToDelete(projectId);
      setModalMessage(
        `Are you sure want to delete project "${projectTitle || "No Title"}"? `,
      );
      setShowModal(true);
    } else {
      setAlertInfo({
        status: "error",
        message: "Invalid project ID.",
      });
      console.error("Attempted to delete with invalid project ID:", projectId);
    }
  };

  const confirmDelete = async () => {
    setShowModal(false);
    if (!projectIdToDelete || typeof projectIdToDelete !== "string") {
      setAlertInfo({
        status: "error",
        message: "Invalid project ID. Deletion canceled.",
      });
      console.error(
        "Invalid projectIdToDelete during confirmation:",
        projectIdToDelete,
      );
      setProjectIdToDelete(null);
      return;
    }

    try {
      const projectRef = doc(db, "projects", projectIdToDelete);
      await deleteDoc(projectRef);
      setAlertInfo({
        status: "success",
        message: "Project deleted successfully!",
      });
      refreshProjects();
    } catch (err) {
      console.error("Failed to delete project: ", err);
      setAlertInfo({
        status: "error",
        message: `Failed to delete project:  ${err.message}`,
      });
    } finally {
      setProjectIdToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setProjectIdToDelete(null);
    setAlertInfo({ status: "info", message: "Deletion canceled." });
  };

  const handleAlertClose = () => {
    setAlertInfo(null);
  };

  return (
    <>
      <Helmet>
        <title>D B I CIPTA | Admin Page</title>
      </Helmet>
      <section id="admin-page" className="min-h-[100vh] py-16 lg:py-4">
        <Container>
          <div className="section-heading my-3 flex items-start lg:my-0 lg:items-center">
            <h2 className="section-heading">Admin Panel</h2>
            <button
              className="btn btn-primary btn-outline ml-auto"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
          <p>
            Signed in as: {user.displayName} - {user.uid}
          </p>

          <div className="table-heading relative my-3">
            <h3>Project List</h3>
            <SearchBar
              placeholder="Search Project..."
              className="my-3 w-full lg:w-1/4"
              onSearch={handleSearch}
            />
            <Link
              to="new-project"
              className="btn btn-primary btn-outline absolute top-0 right-0"
            >
              <IoAddOutline /> Project
            </Link>
          </div>
          <div className="overflow-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>Title</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {error && (
                  <tr>
                    <td colSpan="3">Something went wrong: {error}</td>
                  </tr>
                )}
                {projectsLoading && !error && (
                  <tr>
                    <td colSpan="4" className="p-2 text-center">
                      {" "}
                      <span className="loading loading-spinner loading-lg"></span>
                      <span className="ml-2">Loading Projects</span>
                    </td>
                  </tr>
                )}
                {!projectsLoading &&
                  !error &&
                  filteredProjects.length > 0 &&
                  filteredProjects.map((project, index) => (
                    <tr key={project.id}>
                      <td>{index + 1}</td>
                      <td>{project.id}</td>
                      <td>
                        <Link
                          to={`/projects/${project.id}`}
                          className="hover:text-primary"
                          target="_blank"
                        >
                          {project.title}
                        </Link>
                      </td>
                      <td className="flex items-center justify-center gap-1">
                        <div className="tooltip" data-tip="Edit">
                          <Link to={`edit-project/${project.id}`}>
                            <button
                              type="button"
                              className="btn btn-primary btn-outline btn-sm"
                            >
                              <BiEditAlt />
                            </button>
                          </Link>
                        </div>
                        <div
                          className="tooltip tooltip-error"
                          data-tip="Delete"
                        >
                          <button
                            type="button"
                            className="btn btn-error btn-outline btn-sm"
                            onClick={() =>
                              handleDeleteClick(project.id, project.title)
                            }
                          >
                            <BiTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                {!projectsLoading &&
                  !error &&
                  filteredProjects.length === 0 && (
                    <>
                      {searchTerm ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-error-content text-center"
                          >
                            No projects match for "{searchTerm}".
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan="3">
                            <p className="text-error-content text-center">
                              No Pprojects available.
                            </p>
                          </td>
                        </tr>
                      )}
                    </>
                  )}
              </tbody>
            </table>
          </div>
        </Container>
        <Modal
          show={showModal}
          message={modalMessage}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          confirmText="Delete"
          cancelText="Cancel"
        />
        {alertInfo && (
          <Alert
            key={alertInfo.status + alertInfo.message + Date.now()}
            status={alertInfo.status}
            duration={3000}
            onClose={handleAlertClose}
          >
            {alertInfo.message}
          </Alert>
        )}
      </section>
    </>
  );
}
