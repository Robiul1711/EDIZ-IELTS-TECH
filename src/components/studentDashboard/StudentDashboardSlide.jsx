import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Banner from "@/assets/images/banner3.png";

const StudentDashboardSlide = () => {
  // Array containing the sliding content
  const slideContent = [
    {
      subtitle: "Get ready in advance",
      title:
        "Get yourself prepared ahead of time by taking 2026 free mock test",
      buttonText: "Get free mock test",
      link: "/ielts",
    },
    {
      subtitle: "Master your skills",
      title: "Unlock premium resources to boost your IELTS score today",
      buttonText: "View Resources",
      link: "/dashboard",
    },
    {
      subtitle: "Track your progress",
      title: "Analyze your performance with our advanced 2026 dashboard",
      buttonText: "Check Progress",
      link: "/dashboard",
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-3xl relative">
      {/* Container with the shared background image */}
      <div
        className="relative  w-full  bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-white !opacity-50",
            bulletActiveClass:
              "!opacity-100 !w-8 !rounded-full transition-all duration-300",
          }}
          className="max-w-[1200px] w-full h-full"
        >
          {slideContent.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex h-full w-full items-center justify-end px-6 py-10">
                {/* Content Box - Aligned to the right as per image */}
                <div className="max-w-[500px] text-left md:text-left flex flex-col items-start gap-3">
                  <p className="text-white text-sm md:text-base font-medium opacity-90">
                    {item.subtitle}
                  </p>

                  <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                    {item.title}
                  </h2>

                  <p
                    // onClick={() => navigate(item.link)}
                    className="mt-4 inline-block rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#635BFF] transition-transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    {item.buttonText}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom CSS for the Pagination dots to match the image style */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 20px !important;
          left: 50% !important;
          transform: translateX(-50%);
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          margin: 0 4px !important;
        }
        .swiper-pagination-bullet-active {
          background: white !important;
        }
      `}</style>
    </div>
  );
};

export default StudentDashboardSlide;
