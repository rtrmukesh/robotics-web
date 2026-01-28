import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 pt-[60px] pb-[100px] flex flex-col md:flex-row items-center justify-between bg-[#E4E4E7]">
      <div className="flex-1">
        {/* <h1 className="text-[56px] font-[900] text-[#1a1b1e] leading-[1.1] mb-6"> */}
        <h1 className="text-[58px] font-[900] text-black leading-[1.05] mb-7">

          Buy and sell your <br />
          books <span className="text-[#7c72ff]">for the best <br /> prices</span>
        </h1>
        <p className="text-[#6b7280] text-[15px] max-w-[480px] mb-10 leading-[1.6]">
          Find and read more your favorite, and keep track of the books you want to read. 
          Be part of the world&apos;s largest community of book lovers on Goodreads.
        </p>
        
        <div className="relative max-w-[420px]">
          <input 
            type="text" 
            placeholder="Search for Books..." 
            className="w-full py-[14px] pl-[45px] pr-4 bg-[#f3f4f6] border-none rounded-[6px] text-[14px] focus:outline-none"
          />
          <Search className="absolute left-[15px] top-1/2 -translate-y-1/2 text-[#9ca3af] w-[18px] h-[18px]" />
        </div>
      </div>

      <div className="flex-1 flex justify-end pr-10">
        <div className="relative w-[320px] h-[440px]">
          <div className="absolute inset-0 bg-[#333] rounded-[15px] shadow-[20px_20px_60px_rgba(0,0,0,0.2)] overflow-hidden border-[6px] border-white rotate-[4deg] z-20">
             <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent absolute z-10" />
             <div className="absolute bottom-8 left-0 right-0 text-center z-20 text-white">
                <p className="uppercase text-[10px] tracking-[3px] opacity-70 mb-2">Author Name</p>
                <h3 className="text-[32px] font-serif italic">LOOKING BACK</h3>
             </div>
          </div>
          <div className="absolute inset-0 bg-gray-200 rounded-[15px] translate-x-3 -translate-y-2 rotate-[2deg] z-10 border border-gray-300"></div>
          <div className="absolute inset-0 bg-gray-100 rounded-[15px] translate-x-6 -translate-y-4 rotate-[0deg] z-0 border border-gray-200"></div>
        </div>
      </div>
    </section>
  );
}