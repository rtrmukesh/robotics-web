import { ShoppingCart, Star } from "lucide-react";

const BookCard = ({ price, title }: { price: string; title: string }) => (
  <div
    className="bg-[#f3f7ff] p-5 rounded-[18px] border border-[#eef2ff]
 transition-all hover:-translate-y-2 hover:shadow-card"
  >
    <div className="aspect-[3/4.2] bg-white rounded-[12px] mb-5 shadow-sm flex items-center justify-center overflow-hidden border border-[#f1f5f9]">
      <div className="w-full h-full bg-[#cbd5e1]/20 flex items-center justify-center">
        <span className="text-[11px] text-[#94a3b8] font-bold uppercase tracking-widest">
          Book Cover
        </span>
      </div>
    </div>
    <span className="text-[#7c72ff] font-[900] text-[15px]">₹{price}</span>
    <h3 className="font-bold text-[#1a1b1e] mt-1 text-[14px] line-clamp-1">
      {title}
    </h3>
    <p className="text-[11px] text-[#9ca3af] mt-1">Emma Nelse • ⭐⭐⭐⭐</p>
    <p className="text-[11px] text-[#6b7280] mt-3 mb-5 leading-[1.5] line-clamp-2 italic">
      A simple and classic book for your daily reading list.
    </p>
    <button className="w-full bg-[#121212] text-white py-[10px] rounded-[6px] flex items-center justify-center gap-2 text-[12px] font-bold hover:bg-black transition-colors">
      <ShoppingCart size={14} fill="white" /> ADD TO CART
    </button>
  </div>
);

export default function BookSection({ title }: { title: string }) {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-[60px]">
      <h2 className="text-[28px] font-[900] text-[#1a1b1e] text-center mb-[40px] tracking-tight">
        {title}
      </h2>
      {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-[20px]"> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        <BookCard price="9.99" title="Cooking Made Easy" />
        <BookCard price="14.99" title="Mystery of the Lost" />
        <BookCard price="13.99" title="Shadows of Doubt" />
        <BookCard price="15.75" title="Taste of Italy" />
        <BookCard price="17.50" title="Echoes of Time" />
      </div>
      <div className="flex justify-center gap-[6px] mt-[40px]">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            // className={`w-[8px] h-[8px] rounded-full ${i === 0 ? "bg-[#7c72ff]" : "bg-[#d1d5db]"}`}
            className={`w-2 h-2 rounded-full transition-all
 ${i === 0 ? "bg-primary scale-125" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
