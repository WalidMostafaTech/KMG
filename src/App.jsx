import { Outlet, useLocation } from "react-router";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfileAct } from "./store/profile/profileSlice";
import {
  fetchCountries,
  fetchPlatforms,
  fetchProductsMinutesRange,
} from "./store/setting/setting";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAct());
    dispatch(fetchCountries());
    dispatch(fetchPlatforms());
    dispatch(fetchProductsMinutesRange());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main>
      <Header />

      <div className="min-h-[90vh]">
        <Outlet />
      </div>

      <Footer />

      <Toaster position="top-center" />
    </main>
  );
}

export default App;
