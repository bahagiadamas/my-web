import { Outlet, ScrollRestoration } from "react-router-dom";
import { ProjectProvider } from "../components/ProjectProvider";
import Header from "../components/Header";
import ClientFooter from "../components/ClientFooter";

export default function ClientLayout() {
  return (
    <ProjectProvider>
      <div className="client-layout">
        <Header />
        <main className="min-h-[100vh]">
          <ScrollRestoration />
          <Outlet />
        </main>
        <ClientFooter />
      </div>
    </ProjectProvider>
  );
}
