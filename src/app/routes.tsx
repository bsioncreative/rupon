import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { PartnersPage } from "./pages/PartnersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/partners",
    Component: PartnersPage,
  },
]);
