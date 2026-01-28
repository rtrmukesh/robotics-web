import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import BookSection from "@/src/components/BookSection";
import { PromoBanner, StatsSection } from "@/src/components/PromoBanner";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

       <div className="bg-[#E4E4E7]">
      <Navbar />
      </div>

      <div className="bg-[#E4E4E7]">
      <Hero />
      </div>

      <div className="bg-white">
        <BookSection title="Best Seller Books" />
      </div>

      <div className="bg-white">
        <StatsSection />
      </div>

      <div className="bg-[#fff9c4]">
        <PromoBanner />
      </div>

      <div className="bg-white">
        <BookSection title="New Releases" />
      </div>
      
      <Footer />
    </main>
  );
}