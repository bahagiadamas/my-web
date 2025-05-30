import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ProjectProvider } from "../components/ProjectProvider";

export default function ClientLayout() {
  return (
    <ProjectProvider>
      <div className="client-layout">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </ProjectProvider>
  );
}
