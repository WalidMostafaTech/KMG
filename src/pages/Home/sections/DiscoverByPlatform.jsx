import SectionTitle from "@/components/common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import SwiperNavigation from "@/components/common/SwiperNavigation";
import { useSelector } from "react-redux";

const DiscoverByPlatform = ({ data }) => {
  const { lang } = useSelector((state) => state.language);

  return (
    <section className="sectionPadding container">
      <SectionTitle title={"استكشاف حسب المنصات"} />

      <Swiper
        dir={lang === "ar" ? "rtl" : "ltr"}
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
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="h-32 bg-background">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <SwiperNavigation name="discoverByPlatform" />
    </section>
  );
};

export default DiscoverByPlatform;
