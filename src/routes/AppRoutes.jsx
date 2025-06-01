import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// ROUTES
import PrivateRoute from "./PrivateRoute";

// LAYOUT
import ClientLayout from "../layouts/ClientLayout";
import PrivateLayout from "../layouts/PrivateLayout";

// PAGES
import Home from "../pages/client/Home";
import ProjectList from "../pages/client/ProjectList";
import ProjectDetail from "../pages/client/ProjectDetail";
import SignIn from "../pages/client/SignIn";
import AdminPage from "../pages/admin/Admin";
import NewProject from "../pages/admin/NewProject";
import EditProject from "../pages/admin/EditProject";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<ProjectList />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="admin" element={<PrivateLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="new-project" element={<NewProject />} />
          <Route path="edit-project/:id" element={<EditProject />} />
        </Route>
      </Route>
    </>,
  ),
);
