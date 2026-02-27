"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

export default function NavLinks() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ href }) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="flex flex-col gap-6 mt-18 text-sm text-slate-300">
      {navItems.map(({ label, href }) => {
        const id = href.replace("#", "");
        const isActive = active === id;

        return (
            <a
                key={id}
                href={href}
                onClick={(e) => {
                    e.preventDefault();
                    if (id === "about") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    }
                }}
                className={`flex items-center gap-4 group transition-colors duration-200 ${
                isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
            >
                <span
                className={`block h-px transition-all duration-150 ${
                    isActive
                    ? "w-16 bg-white"
                    : "w-8 bg-slate-400 group-hover:w-16 group-hover:bg-slate-200"
                }`}
                />
                <span className="text-xs tracking-widest uppercase">
                {label}
                </span>
            </a>
        );
      })}
    </nav>
  );
}
