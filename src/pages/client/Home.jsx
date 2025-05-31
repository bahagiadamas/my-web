import { Helmet } from "react-helmet-async";

import {
  IoLaptopOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMail,
} from "react-icons/io5";

import useScaler from "../../hooks/useScaler";

import banner from "../../assets/img/BANNER1.jpeg";
import about from "../../assets/img/Damas.png";

import Container from "../../components/Container";
import FeatureSection from "../../components/FeatureSection";
import ContactSection from "../../components/ContactSection";

export default function Home() {
  const { scaleRef } = useScaler();
  return (
    <>
      <Helmet>
        <title>D B I CIPTA | HOME</title>
      </Helmet>
      <section id="hero" className="relative h-[100vh] overflow-hidden">
        <div
          className="banner-wrapper before:bg-base-content/50 before:backdrop-blur-scale relative h-full w-full"
          ref={scaleRef}
        >
          <img
            src={banner}
            alt="Damas Bahagia Ika Cipta"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="hero-content text-base-200 absolute top-1/2 left-1/2 flex w-full -translate-1/2 flex-col text-center">
          <h1>Damas Bahagia Ika Cipta</h1>
          <p className="text-2">Lorem ipsum dolor sit amet.</p>
          <div className="btn btn-primary text-0">Get to Know</div>
        </div>
      </section>
      <section id="about" className="py-18">
        <Container className="grid grid-cols-1 place-items-center-safe gap-4 lg:grid-cols-2">
          <div className="section-heading">
            <h2 className="section-title">About Me</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              reiciendis nobis et ullam commodi est? Nulla deserunt iste sunt
              blanditiis eos odio consectetur minus reiciendis?
            </p>
            <div className="social-icons *:p-xs *:hover:outline-accent *:hover:text-accent my-3 flex gap-6 *:block *:h-[var(--text-4)] *:w-[var(--text-4)] *:rounded-full *:bg-transparent *:outline-2 *:transition-all *:duration-300">
              <a href="">
                <IoMail className="icon h-full w-full" />
              </a>
              <a href="">
                <IoLogoGithub className="icon h-full w-full" />
              </a>
              <a href="">
                <IoLogoLinkedin className="icon h-full w-full" />
              </a>
            </div>
          </div>
          <div className="about-img">
            <img src={about} alt="Damas Bahagia Ika Cipta" loading="lazy" />
          </div>
        </Container>
      </section>

      <section id="skill">
        <Container>
          <div className="section-heading">
            <h2 className="section-heading">Skills</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              dignissimos in illo, rem ut, quisquam atque error consequatur
              recusandae ipsum eveniet modi, consectetur omnis accusantium!
            </p>
          </div>
          <div className="skill-wrapper my-4 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
            <div className="card p-s transition-all duration-300">
              <figure className="bg-base-100 mx-auto aspect-square w-1/4 rounded-full">
                <IoLaptopOutline className="icon h-full w-full p-4" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Card Title</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
              </div>
            </div>
            <div className="card p-s transition-all duration-300">
              <figure className="bg-base-100 mx-auto aspect-square w-1/4 rounded-full">
                <IoLaptopOutline className="icon h-full w-full p-4" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Card Title</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
              </div>
            </div>
            <div className="card p-s transition-all duration-300">
              <figure className="bg-base-100 mx-auto aspect-square w-1/4 rounded-full">
                <IoLaptopOutline className="icon h-full w-full p-4" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Card Title</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FeatureSection />
      <ContactSection />
    </>
  );
}
