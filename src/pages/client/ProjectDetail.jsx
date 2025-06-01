import { useProjects } from "../../contexts/ProjectContext";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import useScaler from "../../hooks/useScaler";

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, loading, error } = useProjects();
  const [currentProject, setCurrentProject] = useState(null);
  const { scaleRef } = useScaler();

  useEffect(() => {
    if (!loading && !error && projects.length > 0) {
      const foundProject = projects.find((project) => project.id === id);
      setCurrentProject(foundProject);
    }
  }, [projects, loading, error, id]);

  return (
    <>
      {loading && (
        <>
        <Helmet>
          <title>D B I CIPTA | Loading...</title>
        </Helmet>
        <div className="loading-overlay bg-base-200 fixed flex h-[100vh] w-[100vw] items-center justify-center">
          <span className="loading loading-dots loading-xl text-accent-content"></span>
        </div>
        </>
      )}
      <section id="project-detail">
        {error && (
          <h4 className="text-error-content text-center">
            Something went wrong: {error}
          </h4>
        )}
        {!error && !loading && currentProject && (
          <>
            <Helmet>
              <title>D B I CIPTA | {currentProject.title}</title>
              <meta name="description" content={currentProject.description} />
              <meta
                property="og:title"
                content={`${currentProject.title} – Damas Bahagia Ika Cipta`}
              />
              <meta
                property="og:description"
                content={currentProject.description}
              />
              <meta property="og:image" content={currentProject.imgUrl} />
              <meta
                property="og:url"
                content={window.location.href}
              />
              <meta name="twitter:card" content="summary_large_image" />
              <meta
                name="twitter:title"
                content={`${currentProject.title} – Damas Bahagia Ika Cipta`}
              />
              <meta
                name="twitter:description"
                content={currentProject.description}
              />
              <meta name="twitter:image" content={currentProject.imgUrl} />
            </Helmet>
            <article>
              <div className="article-hero @container/detail relative overflow-hidden">
                <figure
                  className="banner-wrapper before:backdrop-blur-scale aspect-[16/7] before:absolute before:inset-0 before:z-5 before:bg-black/55"
                  ref={scaleRef}
                >
                  <img
                    src={currentProject.imgUrl}
                    alt={currentProject.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </figure>
                <span className="@0/detail:text-c3 @lg/detail:text-c4 text-primary-content absolute top-1/2 z-6 w-full -translate-y-1/2 text-center">
                  {currentProject.title}
                </span>
              </div>
              <div
                className="project-body mx-auto my-8 max-w-[min(90%,950px)]"
                dangerouslySetInnerHTML={{
                  __html: currentProject.body || "<p>Unavailable.</p>",
                }}
              ></div>
            </article>
          </>
        )}
      </section>
    </>
  );
}
