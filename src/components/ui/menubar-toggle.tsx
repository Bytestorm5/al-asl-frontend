"use client";

import useInterfaceStore from "@/store/interface";
import { cn } from "@/lib/cn";

export default function MenuBarToggle() {
  const { menuBarOpen, setMenuBarOpen } = useInterfaceStore();

  return (
    <button
      className="relative right-0 top-0 z-20 flex h-10 w-10 text-secondary-dark focus:outline-none md:hidden"
      onClick={() => setMenuBarOpen(!menuBarOpen)}
    >
      <div className="absolute left-1/2 top-1/2 w-5 -translate-x-1/2 -translate-y-1/2 transform">
        <span
          className={cn(
            "absolute",
            "h-0.5",
            "w-5",
            "transform",
            "bg-secondary-dark",
            "transition",
            "duration-300",
            "ease-in-out",
            menuBarOpen ? "rotate-45 delay-200" : "-translate-y-1.5",
          )}
        ></span>
        <span
          className={cn(
            "absolute",
            "h-0.5",
            "transform",
            "bg-secondary-dark",
            "transition-all",
            "duration-200",
            "ease-in-out",
            menuBarOpen ? "w-0 opacity-50" : "w-5 opacity-100 delay-200",
          )}
        ></span>
        <span
          className={cn(
            "absolute",
            "h-0.5",
            "w-5",
            "transform",
            "bg-secondary-dark",
            "transition",
            "duration-300",
            "ease-in-out",
            menuBarOpen ? "-rotate-45 delay-200" : "translate-y-1.5",
          )}
        ></span>
      </div>
    </button>
  );
}
