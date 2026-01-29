"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { ShoppingCart } from "lucide-react";

export const BookCard = ({
  price,
  title,
}: {
  price: string;
  title: string;
}) => (
  <div
    className="bg-[#f3f7ff] p-5 rounded-[18px] border border-[#eef2ff]
   transition-all hover:-translate-y-2 hover:shadow-card"
  >
    <div className="aspect-[3/4.2] bg-white rounded-[12px] mb-5 shadow-sm flex items-center justify-center overflow-hidden border border-[#f1f5f9]">
      <span className="text-[11px] text-[#94a3b8] font-bold uppercase">
        Book Cover
      </span>
    </div>

    <span className="text-[#7c72ff] font-[900] text-[15px]">₹{price}</span>
    <h3 className="font-bold text-[#1a1b1e] mt-1 text-[14px] line-clamp-1">
      {title}
    </h3>

    <p className="text-[11px] text-[#9ca3af] mt-1">Emma Nelse • ⭐⭐⭐⭐</p>

    <p className="text-[11px] text-[#6b7280] mt-3 mb-5 line-clamp-2 italic">
      A simple and classic book for your daily reading list.
    </p>

    <button
      className="w-full bg-[#121212] text-white py-[10px] rounded-[6px]
     flex items-center justify-center gap-2 text-[12px] font-bold"
    >
      <ShoppingCart size={14} /> ADD TO CART
    </button>
  </div>
);

export default function BookSection({ title }: { title: string }) {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-[60px] relative">
      <h2 className="text-[28px] font-[900] text-center mb-10 text-black">{title}</h2>

      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop
          spaceBetween={20}
          autoplay={{
            delay: 2500, 
            disableOnInteraction: false, 
            pauseOnMouseEnter: true,
          }}
          speed={700} 
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          breakpoints={{
            1280: { slidesPerView: 5 },
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {[
            "Cooking Made Easy",
            "Mystery of the Lost",
            "Shadows of Doubt",
            "Taste of Italy",
            "Echoes of Time",
            "Silent Nights",
          ].map((book, i) => (
            <SwiperSlide key={i}>
              <BookCard price="14.99" title={book} />
            </SwiperSlide>
          ))}
        </Swiper>

       
      </div>
    </section>
  );
}
