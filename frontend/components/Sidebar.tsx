import NavLinks from "./NavLinks";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { SidebarProps } from "@/types";

export default async function Sidebar({ data }: SidebarProps) {
    return (
      <aside className="w-full lg:w-1/3 lg:h-screen lg:sticky lg:top-0 flex flex-col lg:justify-between px-6 lg:px-0 py-10 lg:py-16">
        <div className="flex flex-col gap-2 lg:gap-1">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">{data.about.name}</h1>
          <h2 className="text-lg text-white mt-2">{data.about.title}</h2>
          <p className="text-slate-400 mt-2">{data.about.tagline}</p>
          <div className="hidden lg:block">
            <NavLinks />
            <a
              href="/Jeff-zhang-resume.pdf"
              download
              className="text-slate-400 hover:text-white transition-colors duration-150 flex items-center gap-1 text-sm mt-8 group"
            >
              Resume <FiDownload size={14} className="transition-transform duration-150 group-hover:scale-135" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-10 lg:mt-0 text-slate-400">
          <a href="https://github.com/Syufan/Dev-Portfolio/tree/main" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-300 transition-colors duration-150">
            <FaGithub className="w-6 h-6 lg:w-5 lg:h-5" />
          </a>
          <a href="https://www.linkedin.com/in/yufan-zhang-93ba64282" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-300 transition-colors duration-150">
            <FaLinkedin className="w-6 h-6 lg:w-5 lg:h-5" />
          </a>
          <a href="https://www.instagram.com/jeffery_yu_fan/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-300 transition-colors duration-150">
            <FaInstagram className="w-6 h-6 lg:w-5 lg:h-5" />
          </a>
        </div>
      </aside>
    );
  }
