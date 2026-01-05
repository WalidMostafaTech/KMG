import SectionTitle from "@/components/common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import SwiperNavigation from "@/components/common/SwiperNavigation";
import image from "@/assets/images/slider-img.png";
import { Link } from "react-router";

const list = [
  {
    id: 1,
    link: "www.google.com",
    image: image,
  },
  {
    id: 2,
    link: "www.google.com",
    image: image,
  },
  {
    id: 3,
    link: "www.google.com",
    image: image,
  },
  {
    id: 4,
    link: "www.google.com",
    image: image,
  },
  {
    id: 5,
    link: "www.google.com",
    image: image,
  },
  {
    id: 6,
    link: "www.google.com",
    image: image,
  },
  {
    id: 7,
    link: "www.google.com",
    image: image,
  },
  {
    id: 8,
    link: "www.google.com",
    image: image,
  },
];

const DiscoverByPlatform = () => {
  return (
    <section className="sectionPadding container">
      <SectionTitle title={"استكشاف حسب المنصات"} />

      <Swiper
        // dir={lang === "ar" ? "rtl" : "ltr"}
        modules={[Navigation]}
        spaceBetween={16}
        navigation={{
          prevEl: ".discoverByPlatform-prev",
          nextEl: ".discoverByPlatform-next",
        }}
        breakpoints={{
          0: {
            slidesPerView: 2.2,
          },
          640: {
            slidesPerView: 3.3,
          },
          1024: {
            slidesPerView: 4.5,
          },
        }}
      >
        {list?.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              to={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="h-52 bg-card"
            >
              <img
                src={item.image}
                alt={item.link}
                className="w-full h-full object-cover rounded-lg"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <SwiperNavigation name="discoverByPlatform" />
    </section>
  );
};

export default DiscoverByPlatform;
