import SectionTitle from "@/components/common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import SwiperNavigation from "@/components/common/SwiperNavigation";
import { useSelector } from "react-redux";
import TestimonialsSkeleton from "@/components/Loading/SkeletonLoading/TestimonialsSkeleton";
import { useTranslation } from "react-i18next";

const DiscoverByPlatform = ({ data = [], isLoading }) => {
  const { lang } = useSelector((state) => state.language);

  const { t } = useTranslation();

  if (isLoading) {
    return <TestimonialsSkeleton />;
  }

  if (!data || data.length === 0) return null;

  return (
    <section className="sectionPadding container">
      <SectionTitle title={t("discoverByPlatform.title")} />

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
