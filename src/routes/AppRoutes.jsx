import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// LAYOUT
import ClientLayout from "../layouts/ClientLayout";

// PAGES
import Home from "../pages/client/Home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />}></Route>
      </Route>
    </>,
  ),
);
