import { Suspense, lazy } from "react";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

import "./Router.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Home from "../pages/Home";
const Test = lazy(() => import("../pages/Test"));
import Profile from "../pages/Profile";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions";

function Router() {
  const router = createHashRouter([
    {
      element: (
        <>
          <Navbar />
          <main className="app-main">
            <Outlet />
          </main>
          <Footer />
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/test/:question?/:number?",
          element: (
            <Suspense fallback={<div>Laddar...</div>}>
              <Test />
            </Suspense>
          ),
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/terms-and-conditions",
          element: <TermsAndConditions />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
