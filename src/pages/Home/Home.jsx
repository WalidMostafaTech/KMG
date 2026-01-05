import Hero from "./sections/Hero";
import ServicesSection from "./sections/ServicesSection";
import Testimonials from "./sections/Testimonials";
import OrderMethod from "./sections/OrderMethod";
import DiscoverByPlatform from "./sections/DiscoverByPlatform";

const Home = () => {
  return (
    <article>
      <Hero />
      <ServicesSection />
      <Testimonials />
      <OrderMethod />
      <DiscoverByPlatform />
    </article>
  );
};

export default Home;
