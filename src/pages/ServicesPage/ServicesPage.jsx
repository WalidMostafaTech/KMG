import { Outlet } from "react-router";
import ServicesNav from "./ServicesNav";

const ServicesPage = () => {
  return (
    <section>
      <ServicesNav />

      <Outlet />
    </section>
  );
};

export default ServicesPage;
