import SectionTitle from "@/components/common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import SwiperNavigation from "@/components/common/SwiperNavigation";
import TestimonialsCard from "@/components/cards/TestimonialsCard";
import image from "@/assets/images/slider-img.png";
import { useSelector } from "react-redux";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: image,
    rate: 5,
    desc: "أفضل موقع لشراء حسابات GTA! الأسعار معقولة، أشتريت حسابين والاثنين شغّالين بدون أي مشاكل.",
  },
  {
    id: 2,
    name: "John Doe",
    image: image,
    rate: 3.5,
    desc: "أفضل موقع لشراء حسابات GTA! الأسعار معقولة، أشتريت حسابين والاثنين شغّالين بدون أي مشاكل.",
  },
  {
    id: 3,
    name: "John Doe",
    image: image,
    rate: 5,
    desc: "أفضل موقع لشراء حسابات GTA! الأسعار معقولة، أشتريت حسابين والاثنين شغّالين بدون أي مشاكل.",
  },
  {
    id: 4,
    name: "John Doe",
    image: image,
    rate: 5,
    desc: "أفضل موقع لشراء حسابات GTA! الأسعار معقولة، أشتريت حسابين والاثنين شغّالين بدون أي مشاكل.",
  },
  {
    id: 5,
    name: "John Doe",
    image: image,
    rate: 5,
    desc: "أفضل موقع لشراء حسابات GTA! الأسعار معقولة، أشتريت حسابين والاثنين شغّالين بدون أي مشاكل.",
  },
];

const Testimonials = () => {
  const { lang } = useSelector((state) => state.language);

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
        {testimonials?.map((item) => (
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
