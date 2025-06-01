import Container from "../../components/Container";
import Alert from "../../components/Alert";
import ReactQuill from "react-quill-new";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import "react-quill-new/dist/quill.snow.css";

export default function NewProject() {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [alertInfo, setAlertInfo] = useState(null);

  const navigate = useNavigate();

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

    if (!title || !desc || !body || !imageFile) {
      setAlertInfo({
        status: "error",
        message: "Please fill all required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const imgUrl = await uploadToCloudinary(imageFile);

      if (!imgUrl) {
        throw new Error("Image upload failed.");
      }

      const docRef = await addDoc(collection(db, "projects"), {
        title,
        description: desc,
        body,
        imgUrl,
        createdAt: Timestamp.now(),
      });

      setAlertInfo({
        id: Date.now(),
        status: "success",
        message: "Project successfully created.",
      });

      if (navigate) {
        setTimeout(() => navigate(`/projects/${docRef.id}`), 3300);
      }
      // Reset form fields
      setTitle("");
      setDesc("");
      setBody("");
      setImageFile(null);
    } catch (error) {
      console.error("Failed to create project: ", error);
      setAlertInfo({
        status: "error",
        message: `Failed to create project: ${error.message || error.toString()}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAlertClose = () => {
    setAlertInfo(null);
  };

  return (
    <>
      <Helmet>
        <title>D B I CIPTA | Create New Project</title>
        <meta
          name="description"
          content="Use the admin dashboard to create and publish a new portfolio project, including images, descriptions, and detailed content."
        />
      </Helmet>
      <section id="new-project" className="min-h-[100vh] py-4">
        <Container>
          <h2>Create New Project</h2>
          <form className="max-w-[min(100%,600px)]" onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Pick a file*</legend>
              <input
                type="file"
                className="file-input w-full"
                accept="image/*"
                disabled={isSubmitting}
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Title*</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Title"
                autoComplete="off"
                disabled={isSubmitting}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Description*</legend>
              <textarea
                className="textarea input h-24 w-full resize-none"
                autoComplete="off"
                value={desc}
                maxLength={160}
                disabled={isSubmitting}
                placeholder="Short summary of the project (max. 160 characters)"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
              <small className="text-right">{desc.length}/160</small>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Body*</legend>
              <ReactQuill
                theme="snow"
                value={body}
                onChange={setBody}
              ></ReactQuill>
            </fieldset>
            <div className="form-button mt-12">
              <button
                type="button"
                className="btn btn-outline mx-2"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary mx-2">
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
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
    </>
  );
}
