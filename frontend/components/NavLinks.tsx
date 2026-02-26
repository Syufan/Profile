// "use client"
// import { useEffect, useState } from "react";
// import Link from "next/link";

// const navLinks = [
//   { href: "/#about", label: "ABOUT", id: "about" },
//   { href: "/#experience", label: "EXPERIENCE", id: "experience" },
//   { href: "/projects", label: "PROJECTS", id: "projects" },
// ];

// export default function NavLinks() {
//   const [active, setActive] = useState("about");

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ["about", "experience", "projects"];
//       for (const id of sections) {
//         const el = document.getElementById(id);
//         if (el && el.getBoundingClientRect().top <= 200) {
//           setActive(id);
//         }
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav className="flex flex-col gap-4 mt-12">
//       {navLinks.map(link => (
//         <Link key={link.id} href={link.href} className="flex items-center gap-4 text-sm">
//             <span className={`h-px transition-all duration-300 ${active === link.id ? "w-12 bg-white" : "w-6 bg-slate-400"}`}></span>
//             <span className={active === link.id ? "text-white" : "text-slate-400"}>
//                 {link.label}
//             </span>
//         </Link>
//       ))}
//     </nav>
//   );
// }
