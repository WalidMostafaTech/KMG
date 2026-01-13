import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "../App";
import LoadingPage from "../components/Loading/LoadingPage";
import ProtectedRoute from "@/components/protectRoutes/ProtectedRoute";
import AuthGuard from "@/components/protectRoutes/AuthGuard";
import VerifyEmailGuard from "@/components/protectRoutes/VerifyEmailGuard";

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
const VerifyEmail = React.lazy(() =>
  import("../pages/VerifyEmail/VerifyEmail")
);
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

const Chat = React.lazy(() => import("../pages/Chat/Chat"));

const RefundPolicy = React.lazy(() =>
  import("../pages/RefundPolicy/RefundPolicy")
);
const JoinAsPartner = React.lazy(() =>
  import("../pages/JoinAsPartner/JoinAsPartner")
);

const Payment = React.lazy(() => import("../pages/Payment/Payment"));

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
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
            children: [
              { index: true, element: <Account /> },
              { path: "orders", element: <Orders /> },
              { path: "notifications", element: <Notifications /> },
            ],
          },
          { path: "/chat/:id?", element: <Chat /> },
        ],
      },

      { path: "/chat/:id?", element: <Chat /> },

      { path: "/refund-policy", element: <RefundPolicy /> },
      { path: "/join-as-partner", element: <JoinAsPartner /> },

      { path: "/payment", element: <Payment /> },

      {
        element: <AuthGuard />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
          { path: "/forgot-password", element: <ForgotPassword /> },
        ],
      },

      {
        path: "/verify-email",
        element: (
          <VerifyEmailGuard>
            <VerifyEmail />
          </VerifyEmailGuard>
        ),
      },

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
