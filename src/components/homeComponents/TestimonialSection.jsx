import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { FaStar } from "react-icons/fa";

// Sample Testimonial Data
const testimonials = [
  {
    id: 1,
    name: "Nargis kk",
    avatar: "https://i.pravatar.cc/150?img=32",
    text: "Lorem ipsum dolor sit amet consectetur. Eget nunc aliquam massa dolor. Mauris est sagittis nunc",
  },
  {
    id: 2,
    name: "Nargis kk",
    avatar: "https://i.pravatar.cc/150?img=41",
    text: "Lorem ipsum dolor sit amet consectetur. Eget nunc aliquam massa dolor. Mauris est sagittis nunc",
  },
  {
    id: 3,
    name: "Nargis kk",
    avatar: "https://i.pravatar.cc/150?img=52",
    text: "Lorem ipsum dolor sit amet consectetur. Eget nunc aliquam massa dolor. Mauris est sagittis nunc",
  },
  {
    id: 4,
    name: "Nargis kk",
    avatar: "https://i.pravatar.cc/150?img=12",
    text: "Lorem ipsum dolor sit amet consectetur. Eget nunc aliquam massa dolor. Mauris est sagittis nunc",
  },
  {
    id: 5,
    name: "Nargis kk",
    avatar: "https://i.pravatar.cc/150?img=29",
    text: "Lorem ipsum dolor sit amet consectetur. Eget nunc aliquam massa dolor. Mauris est sagittis nunc",
  },
];

const TestimonialCard = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg h-full flex flex-col transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
          IELTS
        </span>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
      </div>
      <div className="flex items-start space-x-4 flex-grow">
        <img
          src={data.avatar}
          alt={data.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-purple-100"
        />
        <div>
          <p className="text-gray-600 italic mb-3 leading-relaxed">
            “{data.text}”
          </p>
          <p className="text-[#8370FF] font-semibold">- {data.name}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const containerRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const swiperRef = React.useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        swiperRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="">
      <div className="">
        <h2
          ref={headerRef}
          className="text-3xl md:text-4xl lg:text-5xl max-w-[680px] mx-auto font-bold text-center text-gray-900 mb-16"
        >
          They Succeeded online – Now it’s Your Turn
        </h2>

        <div ref={swiperRef}>
          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 0,
              slideShadows: false,
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="testimonial-swiper !pb-16 !px-4 md:!px-0 "
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto">
                <TestimonialCard data={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
