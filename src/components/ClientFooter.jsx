import {
  IoFolder,
  IoHome,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMail,
} from "react-icons/io5";
import Container from "./Container";

export default function ClientFooter() {
  return (
    <>
      <footer className="bg-base-200 py-3 shadow-lg">
        <Container>
          <div className="footer-heading grid grid-cols-1 justify-items-start gap-2 lg:grid-cols-3 lg:justify-items-center">
            <div className="footer-top">
              <h4>Connect. Collaborate. Innovate</h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est a
                illo quas sequi veniam voluptatem dicta vero nihil qui expedita.
              </p>
            </div>
            <div className="footer-nav *:my-1 *:flex *:w-fit *:items-center *:gap-2">
              <p className="font-semibold">Links</p>
              <a href="/" className="hover:text-primary">
                <IoHome className="icon" />
                <span>Home</span>
              </a>
              <a href="/projects" className="hover:text-primary">
                <IoFolder className="icon" />
                <span>Projects</span>
              </a>
            </div>
            <div className="footer-links *:my-1 *:flex *:w-fit *:items-center *:gap-2">
              <p className="font-semibold">Connect With Me</p>
              <a href="#" className="hover:text-primary">
                <IoMail className="icon" />
                <span>Email</span>
              </a>
              <a href="#" className="hover:text-primary">
                <IoLogoGithub className="icon" />
                <span>Github</span>
              </a>
              <a href="#" className="hover:text-primary">
                <IoLogoLinkedin className="icon" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="footer-bottom my-1">
            <p className="text-center">Copyright......</p>
          </div>
        </Container>
      </footer>
    </>
  );
}
