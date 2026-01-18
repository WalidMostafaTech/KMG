import SectionTitle from "@/components/common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import SwiperNavigation from "@/components/common/SwiperNavigation";
import TestimonialsCard from "@/components/cards/TestimonialsCard";
import { useSelector } from "react-redux";
import TestimonialsSkeleton from "@/components/Loading/SkeletonLoading/TestimonialsSkeleton";

const Testimonials = ({ data = [], isLoading }) => {
  const { lang } = useSelector((state) => state.language);

  if (isLoading) {
    return <TestimonialsSkeleton />;
  }

  if (!data) return null;

  return (
    <section className="sectionPadding container">
      <SectionTitle title={"اراء العملاء"} />

      <Swiper
        dir={lang === "ar" ? "rtl" : "ltr"}
        modules={[Navigation]}
        spaceBetween={16}
        navigation={{
          prevEl: ".testimonials-prev",
          nextEl: ".testimonials-next",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 2.3,
          },
          1024: {
            slidesPerView: 3.5,
          },
        }}
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <TestimonialsCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <SwiperNavigation name="testimonials" />
    </section>
  );
};

export default Testimonials;
