"use client";

import { useRouter } from 'next/navigation';

export default function NotFoundPageClient() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-br from-purple-600 to-blue-500 text-white font-sans">
      {/* 404 Text */}
      <h1 className="text-[clamp(6rem,20vw,12rem)] md:text-[clamp(8rem,25vw,15rem)] font-black leading-none opacity-90 drop-shadow-lg">
        404
      </h1>
      
      {/* Title */}
      <h2 className="text-[clamp(1.5rem,5vw,2.5rem)] md:text-[clamp(2rem,6vw,3rem)] font-bold mt-4 md:mt-6 mb-2 md:mb-4">
        Oops! Page Not Found
      </h2>
      
      {/* Description */}
      <p className="text-[clamp(1rem,4vw,1.25rem)] md:text-[clamp(1.125rem,4vw,1.5rem)] max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed opacity-90">
        It seems like you&apos;ve wandered off the path. 
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      
      {/* Home Button */}
      <button
        onClick={handleGoHome}
        className="px-8 md:px-10 py-3 md:py-4 text-lg md:text-xl font-semibold bg-white text-purple-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
      >
        Back to Home
      </button>
    </div>
  );
}