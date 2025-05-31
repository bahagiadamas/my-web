import logo from "../assets/img/logo.png";

export default function AdminFooter() {
  return (
    <footer className="footer footer-horizontal bg-base-200 footer-center p-10">
      <aside>
        <img src={logo} alt="Logo" loading="lazy" className="max-h-16" />
        <p className="font-bold">
          D B I CIPTA
          <br />
          Version 1.0.0
        </p>
      </aside>
    </footer>
  );
}
