import ReactQuill from "react-quill-new";
import Alert from "../../components/Alert";
import { db } from "../../firebase";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../../contexts/ProjectContext";
import Container from "../../components/Container";

export default function EditProject() {
  const { id } = useParams();
  const [currentImgUrl, setCurrentImgUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [alertInfo, setAlertInfo] = useState(null);

  const [initialLoading, setInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useProjects();

  useEffect(() => {
    if (!projectsLoading && !projectsError) {
      if (projects && id) {
        const projectToEdit = projects.find((project) => project.id === id);
        if (projectToEdit) {
          setTitle(projectToEdit.title || "");
          setDesc(projectToEdit.description || "");
          setBody(projectToEdit.body || "");
          setCurrentImgUrl(projectToEdit.imgUrl || "");
          setInitialLoading(false);
        } else {
          setFetchError("Project not found.");
          setInitialLoading(false);
        }
      } else if (!projectsLoading && !projects) {
        setFetchError("No projects available.");
        setInitialLoading(false);
      }
    }
  }, [id, projects, projectsLoading, projectsError]);

  const uploadToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dysrm7xcr/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        throw new Error("Upload failed with status " + res.status);
      }

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("No secure_url in response");
      }

      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return undefined;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAlertInfo(null);

    if (!title || !desc || !body || (!imageFile && !currentImgUrl)) {
      setAlertInfo({
        status: "error",
        message: "Please fill all required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let finalImgUrl = currentImgUrl;
      if (imageFile) {
        finalImgUrl = await uploadToCloudinary(imageFile);
        if (!finalImgUrl) {
          throw new Error("Image upload failed.");
        }
      }

      const projectDocRef = doc(db, "projects", id);
      const updatedData = {
        title,
        description: desc,
        body,
        imgUrl: finalImgUrl,
        updatedAt: Timestamp.now(),
      };

      await updateDoc(projectDocRef, updatedData);

      setAlertInfo({
        id: Date.now(),
        status: "success",
        message: "Project updated successfully!",
      });

      setTimeout(() => navigate(`/projects/${id}`), 3000 + 100);
    } catch (error) {
      console.error("Failed to update project: ", error);
      setAlertInfo({
        status: "error",
        message: `Failed to update project: ${error.message || error.toString()}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAlertClose = () => {
    setAlertInfo(null);
  };

  return (
    <section id="edit-project" className="relative min-h-[100vh] py-4">
      <Container>
        {initialLoading ? (
          <div className="loading-container absolute inset-0 flex items-center justify-center">
            <span className="loading loading-dots loading-xl text-primary"></span>
          </div>
        ) : fetchError ? (
          <p className="text-error-content p-[50px] text-center">
            Something went wrong: {fetchError}
          </p>
        ) : !currentImgUrl && !title && !desc && !body ? (
          <p className="texr-error-content p-[50px] text-center">
            {" "}
            Project with project id "{id}" not found.{" "}
          </p>
        ) : (
          <>
            <h2>Edit Project | {id}</h2>
            <form className="max-w-[min(100%,600px)]" onSubmit={handleSubmit}>
              {currentImgUrl && !imageFile && (
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Current Image</legend>
                  <img
                    src={currentImgUrl}
                    alt="Current Image"
                    loading="lazy"
                    className="mx-auto aspect-video h-auto max-w-full rounded-lg object-cover"
                  />
                </fieldset>
              )}
              {imageFile && (
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">New Image</legend>
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="New Image"
                    loading="lazy"
                    className="mx-auto aspect-video h-auto max-w-full rounded-lg object-cover"
                  />
                </fieldset>
              )}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Pick a file</legend>
                <input
                  type="file"
                  className="validator file-input w-full"
                  accept="image/*"
                  disabled={isSubmitting}
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Title</legend>
                <input
                  type="text"
                  className="validator input w-full"
                  placeholder="Title"
                  autoComplete="off"
                  disabled={isSubmitting}
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Description</legend>
                <textarea
                  className="textarea validator h-24 w-full resize-none"
                  autoComplete="off"
                  value={desc}
                  maxLength={160}
                  disabled={isSubmitting}
                  placeholder="Short summary of the project (max. 160 characters)"
                  required
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
                <small className="text-right">{desc.length}/160</small>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Body</legend>
                <ReactQuill
                  theme="snow"
                  value={body}
                  onChange={setBody}
                ></ReactQuill>
              </fieldset>
              <div className="form-button my-12">
                <button
                  type="button"
                  className="btn btn-outline mx-2"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary mx-2">
                  {isSubmitting ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </>
        )}
      </Container>
      {alertInfo && (
        <Alert
          key={alertInfo.id}
          status={alertInfo.status}
          duration={3000}
          onClose={handleAlertClose}
        >
          {alertInfo.message}
        </Alert>
      )}
    </section>
  );
}
