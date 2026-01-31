"use client";
import { useEffect } from "react";

export default function DevToolsBlocker() {
  useEffect(() => {
    if(process.env.NODE_ENV == 'development') return;
    const detectDevTools = () => {
      const threshold = 160;
      const isDevToolsOpen =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;

      if (isDevToolsOpen) {
      window.location.reload(); 
      }
    };

    const interval = setInterval(detectDevTools, 300);
    return () => clearInterval(interval);
  }, []);

  return null
}
