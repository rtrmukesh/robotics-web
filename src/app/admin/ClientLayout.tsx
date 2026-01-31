// app/admin/layout.tsx
"use client";

import Loader from "@/src/components/Loader";
import { supabase } from "@/src/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  LayoutDashboard,
  Menu,
  Settings,
  Users
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DesktopSidebar from "./users/components/DesktopSidebar";
import MobileNav from "./users/components/MobileNav";

export default function ClientAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const { data: session, isLoading, isError } = useQuery({
    queryKey: ["supabase-session"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
    staleTime: 1000 * 60 * 5,
  });

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // Handle Redirection if no user
  useEffect(() => {
    if (!isLoading && !session) {
      console.log("No session found, redirecting...");
      router.push("/");
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return (
      <Loader label="Loading Admin Panel..." />
    );
  }

  if (isError || !session) return null;

  // Navigation items
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Books", href: "/admin/books", icon: <BookOpen size={20} /> },
    { name: "Users", href: "/admin/users", icon: <Users size={20} /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      <MobileNav
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        session={session}
        pathname={pathname}
        navItems={navItems}
        handleLogout={handleLogout}
      />
      
      <div className="flex min-h-screen bg-gray-50">
        <DesktopSidebar session={session} pathname={pathname} navItems={navItems} handleLogout={handleLogout} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className="md:hidden sticky top-0 z-30 bg-white border-b shadow-sm">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <Menu size={24} />
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="font-bold text-white text-sm">A</span>
                  </div>
                  <span className="font-bold text-gray-800">Admin</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative p-2 hover:bg-gray-100 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></div>
                  🔔
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="font-bold text-white text-sm">{session.user.email?.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Desktop Header */}
          <header className="hidden md:flex sticky top-0 z-30 bg-white border-b shadow-sm">
            <div className="flex-1 px-8 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {navItems.find(item => pathname === item.href)?.name || "Dashboard"}
                </h1>
                <p className="text-gray-500 text-sm">Welcome to your admin dashboard</p>
              </div>
              
              <div className="flex items-center space-x-6">
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></div>
                  <span className="text-xl">🔔</span>
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{session.user.email}</p>
                    <p className="text-gray-500 text-sm">Admin</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="font-bold text-white">{session.user.email?.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-4 md:p-8">
            {/* Breadcrumb for Desktop */}
            <div className="hidden md:flex items-center text-sm text-gray-500 mb-6">
              <a href="/admin" className="hover:text-blue-600">Dashboard</a>
              {pathname !== '/admin' && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-gray-800">{navItems.find(item => pathname === item.href)?.name}</span>
                </>
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-6 min-h-[calc(100vh-200px)]">
              {children}
            </div>
          </main>

          {/* Mobile Footer */}
          <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
            <div className="flex justify-around py-3">
              {navItems.slice(0, 3).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center p-2 rounded-xl ${
                    pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500'
                  }`}
                >
                  <div className={`${pathname === item.href ? 'text-blue-600' : 'text-gray-400'}`}>
                    {item.icon}
                  </div>
                  <span className="text-xs mt-1">{item.name}</span>
                </a>
              ))}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex flex-col items-center p-2 rounded-xl text-gray-500"
              >
                <Menu size={20} />
                <span className="text-xs mt-1">More</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}