export function StatsSection() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-[80px] grid grid-cols-1 md:grid-cols-2 gap-[80px] items-center bg-white">
      <div className="grid grid-cols-3 gap-3 bg-[#f3f4f6] p-7 rounded-[28px]">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-white rounded-[8px] shadow-sm border border-gray-100 overflow-hidden">
             {/* Matching the colorful book cover tints from the image */}
             <div className={`w-full h-full ${
               i === 0 ? 'bg-[#ff7675]' : 
               i === 1 ? 'bg-[#74b9ff]' : 
               i === 2 ? 'bg-[#55efc4]' : 
               'bg-[#dfe6e9]'
             }`} />
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-[42px] font-[900] text-[#1a1b1e] mb-5 leading-[1.1]">
          Find Your Favorite <br/><span className="text-[#7c72ff]">Book Here!</span>
        </h2>
        <p className="text-[#6b7280] text-[15px] mb-10 leading-[1.7]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ad iure reprehenderit. Facilis illo unde modum distinctio.
        </p>
        <div className="flex gap-[60px] mb-10">
          <div><h3 className="text-[28px] font-[900] text-[#1a1b1e]">800+</h3><p className="text-[12px] text-[#9ca3af] font-bold uppercase">Book Listing</p></div>
          <div><h3 className="text-[28px] font-[900] text-[#1a1b1e]">550+</h3><p className="text-[12px] text-[#9ca3af] font-bold uppercase">Register User</p></div>
          <div><h3 className="text-[28px] font-[900] text-[#1a1b1e]">1,200+</h3><p className="text-[12px] text-[#9ca3af] font-bold uppercase">Books Sold</p></div>
        </div>
        <button className="bg-[#7c72ff] text-white px-[35px] py-[14px] rounded-[6px] font-bold text-[14px] shadow-[0_10px_20px_rgba(124,114,255,0.3)]">
          Explore Now
        </button>
      </div>
    </section>
  );
}

export function PromoBanner() {
  return (
   <section className="max-w-[1280px] mx-auto px-6 py-[70px] flex justify-between items-center bg-[#fff9c4]">
      <div className="max-w-[700px]">
        <h2 className="text-[32px] font-[900] text-[#1a1b1e] mb-8 leading-tight">
          2025 National Book Awards for Fiction Shortlist
        </h2>
        <button className="bg-[#7c72ff] text-white px-[25px] py-[12px] rounded-[6px] font-bold text-[13px]">
          Explore Now
        </button>
      </div>
      <div className="relative">
         {/* Trophy icon with stack effect to match image */}
         <div className="relative z-10 flex flex-col items-center">
            <span className="text-[100px] drop-shadow-2xl">🏆</span>
            <div className="w-[120px] h-[12px] bg-[#eb4d4b] rounded-t-sm -mt-4 shadow-md"></div>
            <div className="w-[130px] h-[15px] bg-white rounded-sm mt-1 shadow-md"></div>
         </div>
      </div>
    </section>
  );
}