import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import {
  IoLaptopOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMail,
  IoPeopleOutline,
  IoStatsChartOutline,
} from "react-icons/io5";

import useScaler from "../../hooks/useScaler";
import useScrollReveal from "../../hooks/useScrollReveal";
import useTypewriter from "../../hooks/useTypewriter";

import banner from "../../assets/img/BANNER1.jpeg";
import about from "../../assets/img/Damas.png";
import unsoed from "../../assets/img/unsoed.png";
import ut from "../../assets/img/ut.png";
import noov from "../../assets/img/noovoleum.jpeg";
import dnd from "../../assets/img/dndkirim.webp";
import jala from "../../assets/img/jala-blue.jpeg";

import Container from "../../components/Container";
import FeatureSection from "../../components/FeatureSection";
import ContactSection from "../../components/ContactSection";

export default function Home() {
  const { scaleRef } = useScaler();
  const navigate = useNavigate();
  const text = [
    "Solving Problems",
    "Creating Solutions",
    "Building Futures",
    "Shaping Ideas",
    "Driving Progress",
    "Making Impact",
    "Inpiring Growth",
  ];
  const typeRef = useTypewriter(text);
  useScrollReveal();
  return (
    <>
      <Helmet>
        <title>D B I CIPTA | HOME</title>
        <meta
          name="description"
          content="Welcome to the official portfolio of Damas Bahagia Ika Cipta, passionate on showcasing creative works, projects, and skills."
        />
        <meta
          name="keywords"
          content="portfolio, Damas Bahagia Ika Cipta, web developer, designer, projects, freelancer"
        />
        <meta name="author" content="Damas Bahagia Ika Cipta" />
      </Helmet>
      <section id="hero" className="relative h-[100vh] overflow-hidden">
        <div
          className="banner-wrapper before:backdrop-blur-scale relative h-full w-full before:bg-black/50"
          ref={scaleRef}
        >
          <img
            src={banner}
            alt="Damas Bahagia Ika Cipta"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="hero-content text-primary-content absolute top-1/2 left-1/2 flex w-full -translate-1/2 flex-col text-center">
          <h1 className="popup-up">Damas Bahagia Ika Cipta</h1>
          <p className="typewriter text-2 popup-up" ref={typeRef}>
            |
          </p>
          <div
            className="btn btn-primary text-0 popup-up"
            onClick={() => navigate("#about")}
          >
            Get to Know
          </div>
        </div>
      </section>

      <section id="about" className="py-18">
        <Container className="grid grid-cols-1 place-items-center-safe gap-4 lg:grid-cols-2">
          <div className="section-heading order-2 lg:order-1">
            <h2 className="section-title popup-up">About Me</h2>
            <p className="popup-up">
              Hi, I’m Damas Bahagia Ika Cipta — a multidisciplinary professional
              with a strong interest in business, technology, and sustainable
              development. <br /> <br />
              With a background that spans across industries such as
              aquaculture, logistics, and waste management, I bring a unique
              blend of practical experience and a problem-solving mindset. I’m
              passionate about leveraging technology, innovation, and
              collaboration to build impactful and scalable solutions. <br />{" "}
              <br />
              I’m currently exploring new opportunities where I can contribute
              to meaningful projects, grow professionally, and work with teams
              that value integrity, creativity, and continuous improvement.{" "}
              <br /> <br />
              Let’s connect and explore how we can work together.
            </p>
            <div className="social-icons *:p-xs *:hover:outline-accent *:hover:text-accent my-3 flex gap-6 *:block *:h-[var(--text-4)] *:w-[var(--text-4)] *:rounded-full *:bg-transparent *:outline-2 *:transition-all *:duration-300">
              <a href="mailto:bahagiadamas@gmail.com" className="popup-up">
                <IoMail className="icon h-full w-full" />
              </a>
              <a
                href="https://github.com/bahagiadamas"
                target="_blank"
                rel="noreferrer"
                className="popup-up"
              >
                <IoLogoGithub className="icon h-full w-full" />
              </a>
              <a
                href="https://www.linkedin.com/in/damas-bahagia-ika-cipta-958261220/"
                target="_blank"
                rel="noreferrer"
                className="popup-up"
              >
                <IoLogoLinkedin className="icon h-full w-full" />
              </a>
            </div>
          </div>
          <div className="about-img popup-up order-1 lg:order-2">
            <img src={about} alt="Damas Bahagia Ika Cipta" loading="lazy" />
          </div>
        </Container>
      </section>

      <section id="skill">
        <Container>
          <div className="section-heading">
            <h2 className="section-title popup-up">Skills</h2>
            <p className="popup-up max-w-[min(100%,80ch)]">
              With a broad and adaptable skill set, I approach every task with
              focus, creativity, and a drive for excellence. Whether working
              independently or in teams, I thrive in dynamic environments and
              deliver results that matter.
            </p>
          </div>
          <div className="skill-wrapper my-4 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
            <div className="card p-s popup-up transition-all duration-300">
              <figure className="bg-base-100 mx-auto aspect-square w-1/4 rounded-full">
                <IoLaptopOutline className="icon h-full w-full p-4" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Technology & Digital Solutions</h2>
                <p>
                  Proficient in web development, digital platforms, and
                  leveraging technology for efficiency and innovation.
                </p>
              </div>
            </div>
            <div className="card p-s popup-up transition-all duration-300">
              <figure className="bg-base-100 mx-auto aspect-square w-1/4 rounded-full">
                <IoStatsChartOutline className="icon h-full w-full p-4" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Data & Productivity Optimization</h2>
                <p>
                  Skilled in organizing, analyzing, and utilizing data-driven
                  tools for better decision-making and workflow management.
                </p>
              </div>
            </div>
            <div className="card p-s popup-up transition-all duration-300">
              <figure className="bg-base-100 mx-auto aspect-square w-1/4 rounded-full">
                <IoPeopleOutline className="icon h-full w-full p-4" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Community & Sustainability</h2>
                <p>
                  Experienced in empowering communities, fostering partnerships,
                  and implementing sustainable solutions for long-term impact.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="education" className="py-16">
        <Container>
          <h2 className="section-title popup-up">Education</h2>
          <div className="edu-container">
            <div className="timeline-component">
              <div className="timeline-progress popup-up">
                <div className="timeline-progress-bar"></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <h3 className="timeline-date popup-up">
                    September 2023 - Present
                  </h3>
                </div>
                <div className="timeline-center popup-up">
                  <div className="timeline-circle edu ut">
                    <img src={ut} alt="UT" loading="lazy" />
                  </div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-text">
                    <h3 className="popup-up">Terbuka University</h3>
                    <p className="tagline popup-up">
                      Bachelor Degree in General Management
                    </p>
                    <p className="popup-up">
                      Currently pursuing a Bachelor’s degree focused on
                      strategic and operational functions in business, including
                      marketing, finance, human resources, and organizational
                      management. The program equips me with analytical,
                      leadership, and decision-making skills to effectively
                      develop and execute business strategies across various
                      industries.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <h3 className="timeline-date popup-up">September 2018 - 2021</h3>
                </div>
                <div className="timeline-center popup-up">
                  <div className="timeline-circle edu unsoed">
                    <img src={unsoed} alt="UNSOED" loading="lazy" />
                  </div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-text">
                    <h3 className="popup-up">Jenderal Soedirman University</h3>
                    <p className="tagline popup-up">
                      Associate Degree in Aquaculture
                    </p>
                    <p className="popup-up">
                      Completed an Associate’s Degree with a focus on
                      aquaculture science, combining both theoretical and
                      hands-on learning. Gained practical experience in field
                      operations, problem-solving, and process optimization,
                      while developing strong analytical and communication
                      skills applicable to various technical and community-based
                      roles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="experiences" className="py16">
        <Container>
          <h2 className="popup-up section-title">Experiences</h2>
          <div className="expe-container">
            <div className="timeline-component">
              <div className="timeline-progress popup-up">
                <div className="timeline-progress-bar"></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <h3 className="timeline-date popup-up">
                    September 2024 - Present
                  </h3>
                </div>
                <div className="timeline-center popup-up">
                  <div className="timeline-circle expe noov">
                    <img src={noov} alt="noov" loading="lazy" />
                  </div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-text">
                    <h3 className="popup-up">noovoleum</h3>
                    <p className="tagline popup-up">
                      Community Engagement Officer - Jakarta - Palembang
                    </p>
                    <p className="popup-up">
                      Lead community-based initiatives to support waste oil
                      collection by engaging households, food vendors, and small
                      producers. Built and maintained strong local relationships
                      through outreach and education programs. Worked
                      cross-functionally to ensure operational efficiency, while
                      utilizing AI tools to optimize data tracking and reporting
                      across collection activities.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <h3 className="timeline-date popup-up">
                    February - September 2024
                  </h3>
                </div>
                <div className="timeline-center popup-up">
                  <div className="timeline-circle expe dnd">
                    <img src={dnd} alt="dnd" loading="lazy" />
                  </div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-text">
                    <h3 className="popup-up">DND Kirim Indonesia</h3>
                    <p className="tagline popup-up">
                      Business Development - Jakarta
                    </p>
                    <p className="popup-up">
                      Identified and pursued new business opportunities aligned
                      with company goals. Developed market-entry strategies, led
                      client acquisition campaigns, and collaborated with
                      marketing to create impactful promotional content. Managed
                      key partnerships, negotiated terms, and tracked
                      performance to maximize growth and client satisfaction.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <h3 className="timeline-date popup-up">
                    January - October 2023
                  </h3>
                </div>
                <div className="timeline-center popup-up">
                  <div className="timeline-circle expe jala">
                    <img src={jala} alt="jala" loading="lazy" />
                  </div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-text">
                    <h3 className="popup-up">JALA Tech</h3>
                    <p className="tagline popup-up">
                      Community Development Executive - Yogyakarta
                    </p>
                    <p className="popup-up">
                      Managed online and offline customer communities, fostering
                      engagement and collaboration. Developed affiliate and
                      partnership networks to expand user reach. Conducted
                      research and community mapping to align initiatives with
                      local needs. Worked closely with marketing and sales teams
                      to drive product adoption and upselling through
                      community-led strategies.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <h3 className="timeline-date popup-up">May - December 2022</h3>
                </div>
                <div className="timeline-center popup-up">
                  <div className="timeline-circle expe jala">
                    <img src={jala} alt="jala" loading="lazy" />
                  </div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-text">
                    <h3 className="popup-up">JALA Tech</h3>
                    <p className="tagline popup-up">Field Assistant - Cirebon</p>
                    <p className="popup-up">
                      Provided on-the-ground support to shrimp farmers,
                      including daily monitoring and training on aquaculture
                      best practices. Facilitated workshops to promote inclusive
                      participation in the industry. Supported the
                      implementation of field programs, improving awareness and
                      adoption of digital tools in rural aquaculture
                      communities.
                    </p>
                  </div>
                </div>
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
