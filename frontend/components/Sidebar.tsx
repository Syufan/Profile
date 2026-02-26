import Link from "next/link";
// import NavLinks from "./NavLinks";

export default function Sidebar() {
    return (
      <aside className="w-1/3 h-screen sticky top-0 flex flex-col justify-between py-16">
        <div>
          <h1 className="text-5xl font-bold text-white">Jeff Zhang</h1>
          <h2 className="text-lg text-white mt-2">Full Stack Software Engineer</h2>
          <p className="text-slate-400 mt-2">I build AI-integrated applications and scalable backend systems.</p>

          <nav className="flex flex-col gap-4 mt-18 text-sm text-slate-300">
            <Link href="/#about" className="flex items-center gap-4 text-white">
            <span className="w-6 h-px bg-white"></span>
              ABOUT
            </Link>

            <Link href="/#experience" className="flex items-center gap-4 text-slate-400">
            <span className="w-6 h-px bg-slate-400"></span>
              EXPERIENCE
            </Link>
            <a href="/projects" className="flex items-center gap-4 text-slate-400">
            <span className="w-6 h-px bg-slate-400"></span>
              PROJECTS
            </a>
          </nav>
          {/* <NavLinks /> */}
        </div>

        <div className="flex gap-4 text-slate-400">
          <a href="" target="_blank">GitHub</a>
          <a href="" target="_blank">LinkedIn</a>
          <a href="" target="_blank">Instagram</a>
        </div>
      </aside>
    );
  }
