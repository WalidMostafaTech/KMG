import Hero from "./sections/Hero";
import ServicesSection from "./sections/ServicesSection";
import Testimonials from "./sections/Testimonials";
import OrderMethod from "./sections/OrderMethod";
import DiscoverByPlatform from "./sections/DiscoverByPlatform";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "@/services/homeServices";

const Home = () => {
  const {
    data: homeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["home"],
    queryFn: getHome,
  });

  return (
    <article>
      <Hero data={homeData?.sliders} />
      <ServicesSection />
      <Testimonials data={homeData?.testimonials} />
      <OrderMethod data={homeData?.order_ways} />
      <DiscoverByPlatform data={homeData?.platforms} />
    </article>
  );
};

export default Home;
