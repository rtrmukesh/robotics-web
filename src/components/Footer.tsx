import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white pt-[80px] pb-[30px]">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-[50px] mb-[60px]">
        <div>
          <h3 className="text-[22px] font-[900] mb-6 tracking-tight">Books</h3>
          <p className="text-[#9ca3af] text-[13px] leading-[1.6]">Books Delivered, Inspiration Unlimited. Join our community and explore the world of stories.</p>
        </div>

        <div>
          <h4 className="font-bold text-[16px] mb-6">Quick Links</h4>
          <ul className="space-y-4 text-[13px] text-[#9ca3af]">
            <li><Link href="#" className="hover:text-white">Home</Link></li>
            <li><Link href="#" className="hover:text-white">About Us</Link></li>
            <li><Link href="#" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[16px] mb-6">Contact</h4>
          <ul className="space-y-4 text-[13px] text-[#9ca3af]">
            <li>Email: contact@themukesh.com</li>
            <li>Phone: +91 9786000000</li>
            <li>MNPC, Mathura - 122007</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[16px] mb-6">We Accept</h4>
          <div className="flex gap-3">
             <div className="w-[50px] h-[30px] bg-[#1a1f71] rounded flex items-center justify-center text-[10px] font-bold italic">VISA</div>
             <div className="w-[50px] h-[30px] bg-[#eb001b] rounded flex items-center justify-center text-[10px] font-bold italic">MC</div>
             <div className="w-[50px] h-[30px] bg-[#0070ba] rounded flex items-center justify-center text-[10px] font-bold italic">Paypal</div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#111827] pt-[30px] text-center text-[11px] text-[#6b7280]">
        © 2025 Books. All rights reserved | Made By Sonu ❤️
      </div>
    </footer>
  );
}