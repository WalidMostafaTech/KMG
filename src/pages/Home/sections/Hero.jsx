import sliderImg from "@/assets/images/slider-img.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useSelector } from "react-redux";

const sliderData = [
  { id: 1, img: sliderImg },
  { id: 2, img: sliderImg },
  { id: 3, img: sliderImg },
  { id: 4, img: sliderImg },
  { id: 5, img: sliderImg },
];

const Hero = () => {
  const { lang } = useSelector((state) => state.language);

  return (
    <section className="container py-10">
      <div className="h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-3xl overflow-hidden relative">
        <Swiper
          dir={lang === "ar" ? "rtl" : "ltr"}
          modules={[Pagination, Autoplay]}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full hero-swiper"
        >
          {sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img
                src={slide.img}
                alt=""
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scoped Styles */}
        <style>
          {`
            .hero-swiper .swiper-pagination-bullet {
              background: rgba(255, 255, 255, 0.6);
              opacity: 1;
              width: 10px;
              height: 10px;
              transition: all 0.3s ease;
            }

            .hero-swiper .swiper-pagination-bullet-active {
              background: #fff;
              transform: scale(1.7);
            }
          `}
        </style>
      </div>
    </section>
  );
};

export default Hero;
