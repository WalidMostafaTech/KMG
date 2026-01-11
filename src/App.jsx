import { Outlet, useLocation } from "react-router";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();

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
    </main>
  );
}

export default App;
