"use client";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import SignInModal from "./SignInModal";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    // get current session on mount
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    // subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user;
        setUser(session?.user ?? null);
        if (_event === "SIGNED_IN" && currentUser) {
          try {
            await fetch("/api/auth/sync", {
              method: "POST",
              body: JSON.stringify({
                auth_id: currentUser?.id,
                email: currentUser?.email,
                name: currentUser?.user_metadata?.full_name,
                avatar_url: currentUser?.user_metadata?.avatar_url,
              }),
            });
          } catch (err) {
            console.error("Sync error:", err);
          }
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <SignInModal open={open} onClose={() => setOpen(false)} />
      <nav className="max-w-[1280px] mx-auto w-full bg-[#E4E4E7] py-3 md:py-5 px-4 md:px-[90px] flex justify-between items-center sticky top-0 z-50">
        {/* LOGO */}
        <div className="text-[18px] md:text-[24px] font-[900] text-[#1a1b1e] tracking-tight">
          Books
        </div>

        {/* MENU */}
        <div className="flex items-center gap-3 md:gap-[45px]">
          <Link
            href="/"
            className="text-primary font-bold text-[11px] md:text-[13px]"
          >
            HOME
          </Link>

          <Link
            href="#"
            className="text-[#6b7280] font-bold text-[11px] md:text-[13px] hover:text-[#7c72ff]"
          >
            EXPLORE
          </Link>

          <Link
            href="#"
            className="hidden sm:block text-[#6b7280] font-bold text-[11px] md:text-[13px] hover:text-[#7c72ff]"
          >
            GIFT
          </Link>

          <Link
            href="#"
            className="hidden md:block text-[#6b7280] font-bold text-[13px] hover:text-[#7c72ff]"
          >
            SELL
          </Link>

          {user ? (
            <div className="relative group">
              {/* Round avatar */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold"
              >
                {user?.email?.[0].toUpperCase()}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-lg py-2 z-50">
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="
                text-[#7c72ff]
                p-2
                sm:border sm:border-[#7c72ff]
                sm:px-3 md:px-5 sm:py-1.5
                rounded-lg
                hover:bg-[#7c72ff] hover:text-white
                transition
                flex items-center justify-center gap-2
              "
            >
              <span className="hidden sm:block text-[11px] md:text-[14px] font-semibold">
                LOGIN
              </span>

              <FontAwesomeIcon
                icon={faArrowRightToBracket}
                className="w-4 h-4 sm:w-3 sm:h-3"
              />
            </button>
          )}
        </div>

        {/* CART */}
        <div className="relative cursor-pointer ml-2">
          <ShoppingCart className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] text-[#1a1b1e]" />
          <span className="absolute -top-[6px] -right-[8px] bg-[#eb4d4b] text-white text-[9px] md:text-[10px] w-[16px] h-[16px] md:w-[18px] md:h-[18px] flex items-center justify-center rounded-full font-bold">
            2
          </span>
        </div>
      </nav>
    </>
  );
}
