import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "../App";
import LoadingPage from "../components/Loading/LoadingPage";

const Home = React.lazy(() => import("../pages/Home/Home"));
const ServicesPage = React.lazy(() =>
  import("../pages/ServicesPage/ServicesPage")
);
const ServicesAccounts = React.lazy(() =>
  import("../pages/ServicesPage/pages/ServicesAccounts/ServicesAccounts")
);
const ServicesAccountsDetails = React.lazy(() =>
  import(
    "../pages/ServicesPage/pages/ServicesAccountsDetails/ServicesAccountsDetails"
  )
);
const ServicesAccountsCheckout = React.lazy(() =>
  import(
    "../pages/ServicesPage/pages/ServicesAccountsCheckout/ServicesAccountsCheckout"
  )
);

const Register = React.lazy(() => import("../pages/Register/Register"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword/ForgotPassword"));

const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/services",
        element: <ServicesPage />,
        children: [
          { index: true, element: <ServicesAccounts /> },
          {
            path: "/services/accounts/:id",
            element: <ServicesAccountsDetails />,
          },
          {
            path: "/services/accounts/checkout/:id",
            element: <ServicesAccountsCheckout />,
          },
        ],
      },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
