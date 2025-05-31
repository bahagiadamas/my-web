import { useProjects } from "../contexts/ProjectContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import Container from "./Container";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function FeatureSection() {
  const { projects, loading, error } = useProjects();

  return (
    <section id="feature">
      <Container>
        <div className="section-heading">
          <h2 className="section-title">Feature</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            asperiores unde officiis, suscipit magnam illum ipsum consequatur
            quam amet consectetur? Dicta at ea voluptas dolorum.
          </p>
          <Link to="/projects">
            <button className="btn btn-outline btn-primary btn-lg my-3">
              Explore Projects
            </button>
          </Link>
        </div>

        <Swiper
          className="!px-2 !py-10"
          modules={[Autoplay, Pagination]}
          loop={true}
          speed={2000}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {error && (
            <p className="text-error-content p-12 text-center">
              Something went wrong: {error}
            </p>
          )}
          {loading && (
            <>
              <SwiperSlide>
                <div className="skeleton h-full w-full"></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="skeleton h-full w-full"></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="skeleton h-full w-full"></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="skeleton h-full w-full"></div>
              </SwiperSlide>
            </>
          )}
          {!error &&
            !loading &&
            projects.length > 0 &&
            projects.map((project) => (
              <SwiperSlide key={project.id} className="rounded-xl shadow-xl">
                <Link className="@container/feature relative">
                  <div className="img-wrapper before:bg-base-content/65 relative h-full w-full overflow-hidden rounded-xl">
                    <img
                      src={project.imgUrl}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h4 className="text-base-200 @0/feature:text-c3 absolute top-1/2 -translate-y-1/2 p-1 text-center">
                    {project.title}
                  </h4>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </section>
  );
}
