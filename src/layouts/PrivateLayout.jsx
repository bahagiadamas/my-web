import { Outlet, ScrollRestoration } from "react-router-dom";
import { ProjectProvider } from "../components/ProjectProvider";

import SideBar from "../components/SideBar";
import AdminFooter from "../components/AdminFooter";

export default function PrivateLayout() {
  return (
    <ProjectProvider>
      <div className="private-layout lg:grid lg:grid-cols-[auto_1fr]">
        <SideBar />
        <main className="min-h-[100vh]">
          <ScrollRestoration />
          <Outlet />
          <AdminFooter />
        </main>
      </div>
    </ProjectProvider>
  );
}
