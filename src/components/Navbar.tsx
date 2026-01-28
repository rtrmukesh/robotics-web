import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="max-w-[1280px] mx-auto w-full bg-[#E4E4E7] py-5 px-[90px] flex justify-between items-center sticky top-0 z-50">
      <div className="text-[24px] font-[900] text-[#1a1b1e] tracking-tight">
        Books
      </div>

      <div className="hidden md:flex items-center gap-[45px]">
        <Link
          href="/"
          className="text-primary font-bold text-[13px] relative after:absolute after:w-full after:h-[2px] after:bg-primary after:left-0 after:-bottom-2"
        >
          HOME
        </Link>
        <Link
          href="#"
          className="text-[#6b7280] font-bold text-[13px] hover:text-[#7c72ff]"
        >
          FOR YOU
        </Link>
        <Link
          href="#"
          className="text-[#6b7280] font-bold text-[13px] hover:text-[#7c72ff]"
        >
          GIFT
        </Link>
        <Link
          href="#"
          className="text-[#6b7280] font-bold text-[13px] hover:text-[#7c72ff]"
        >
          SELL YOUR BOOK
        </Link>
      </div>

      <div className="relative cursor-pointer mr-2">
        <ShoppingCart className="w-[22px] h-[22px] text-[#1a1b1e]" />
        <span className="absolute -top-[8px] -right-[10px] bg-[#eb4d4b] text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold">
          2
        </span>
      </div>
    </nav>
  );
}
