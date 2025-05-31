import { Link } from "react-router-dom";
import Container from "../../components/Container";
import SearchBar from "../../components/SearchBar";

import { useProjects } from "../../contexts/ProjectContext";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";

export default function ProjectList() {
  const { projects, loading, error } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = useMemo(() => {
    if (!searchTerm) {
      return projects;
    }
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        (project.body && project.body.toLowerCase().includes(searchTerm)),
    );
  }, [projects, searchTerm]);

  const handleSearch = (query) => {
    setSearchTerm(query.toLowerCase());
  };
  return (
    <>
      <Helmet>
        <title>D B I CIPTA | Projects</title>
      </Helmet>

      <section id="project-list">
        <Container>
          <div className="section-heading my-3 flex flex-col items-center lg:flex-row">
            <h2 className="section-title mb-3 text-center lg:text-left">
              Projects
            </h2>
            <SearchBar
              onSearch={handleSearch}
              placeholder="Searc Projects..."
              className="w-full lg:ml-auto lg:w-1/4"
            />
          </div>

          <div className="project-wrapper my-7">
            {error && (
              <p className="text-error-content p-12 text-center">
                Something went wrong: {error}
              </p>
            )}
            {loading && (
              <>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </>
            )}
            {!loading &&
              filteredProjects.length > 0 &&
              filteredProjects.map((project) => (
                <div
                  className="card bg-base-100 @container/project shadow-lg"
                  key={project.id}
                >
                  <figure>
                    <img src={project.imgUrl} alt="Shoes" />
                  </figure>
                  <div className="card-body p-4">
                    <h2 className="card-title @0/project:text-c1">
                      {project.title}
                    </h2>
                    <p className="@0/project:text-c0">{project.description}</p>
                    <div className="card-actions justify-end">
                      <Link
                        to={`${project.id}`}
                        className="btn btn-primary btn-outline"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            {!loading && !error && filteredProjects.length === 0 && (
              <>
                {searchTerm ? (
                  <p className="text-info-content text-center">
                    No projects found for "{searchTerm}".
                  </p>
                ) : (
                  <p className="text-info-content text-center">
                    No projects available.
                  </p>
                )}
              </>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
