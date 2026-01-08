import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "../App";
import LoadingPage from "../components/Loading/LoadingPage";

const Home = React.lazy(() => import("../pages/Home/Home"));
const ServicesPage = React.lazy(() =>
  import("../pages/ServicesPage/ServicesPage")
);
const Accounts = React.lazy(() =>
  import("../pages/ServicesPage/pages/Accounts/Accounts")
);
const AccountsDetails = React.lazy(() =>
  import("../pages/ServicesPage/pages/AccountsDetails/AccountsDetails")
);
const AccountsCheckout = React.lazy(() =>
  import("../pages/ServicesPage/pages/AccountsCheckout/AccountsCheckout")
);
const Subscriptions = React.lazy(() =>
  import("../pages/ServicesPage/pages/Subscriptions/Subscriptions")
);
const BalanceTopUp = React.lazy(() =>
  import("../pages/ServicesPage/pages/BalanceTopUp/BalanceTopUp")
);
const GiftCards = React.lazy(() =>
  import("../pages/ServicesPage/pages/GiftCards/GiftCards")
);
const AddGameToAccount = React.lazy(() =>
  import("../pages/ServicesPage/pages/AddGameToAccount/AddGameToAccount")
);

const Register = React.lazy(() => import("../pages/Register/Register"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const ForgotPassword = React.lazy(() =>
  import("../pages/ForgotPassword/ForgotPassword")
);

const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const Account = React.lazy(() =>
  import("../pages/Profile/pages/Account/Account")
);
const Orders = React.lazy(() => import("../pages/Profile/pages/Orders/Orders"));
const Notifications = React.lazy(() =>
  import("../pages/Profile/pages/Notifications/Notifications")
);

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
          { index: true, element: <Accounts /> },
          {
            path: "/services/accounts/:id",
            element: <AccountsDetails />,
          },
          {
            path: "/services/accounts/checkout/:id",
            element: <AccountsCheckout />,
          },
          {
            path: "/services/subscriptions",
            element: <Subscriptions />,
          },
          {
            path: "/services/balance-top-up",
            element: <BalanceTopUp />,
          },
          {
            path: "/services/gift-cards",
            element: <GiftCards />,
          },
          {
            path: "/services/add-game-to-account",
            element: <AddGameToAccount />,
          },
        ],
      },

      {
        path: "/profile",
        element: <Profile />,
        children: [
          { index: true, element: <Account /> },
          { path: "orders", element: <Orders /> },
          { path: "notifications", element: <Notifications /> },
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
