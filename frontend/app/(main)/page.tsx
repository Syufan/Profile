import TechBadge from "@/components/TechBadge";
import { getProfile } from "@/services/api";
import { Experience } from "@/types";
import Link from "next/link";
import ResumeButton from "@/components/ResumeButton";

export default async function Home() {
  const data = await getProfile();
  return (
    <div className="flex flex-col gap-28 lg:gap-30 py-8 lg:py-19">
      <section id="about">
        <h2 className="text-xs font-medium tracking-widest uppercase text-white mb-6 lg:hidden">About</h2>
        {data.about.paragraphs.map((p: string, i: number) => (
          <p key={i} className="text-slate-400 mt-4">{p}</p>
        ))}
      </section>

      <section id="experience">
      <h2 className="text-xs font-medium tracking-widest uppercase text-white mb-6 lg:hidden">Experience</h2>
        {data.experience.map((experience: Experience, i: number) => (
          <a key={i}
            href={experience.url}
            target="_blank"
            className="flex flex-col lg:flex-row gap-1 mb-4 p-4 -mx-4 rounded-lg transition-all duration-200 hover:bg-slate-800/50 group">
            <p className="text-slate-400 text-sm lg:w-40 lg:shrink-0 pt-0.5">{experience.period}</p>

            <div>
            <h3 className="text-white group-hover:text-teal-300 transition-colors duration-150 flex items-center gap-1">
              {experience.role} · {experience.company}
              <span className="inline-block transition-transform duration-150 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
            </h3>

              <ul className="mt-4 flex flex-col gap-2">
              {experience.bullets.map((bullet, j) => (
                <li key={j} className="text-slate-400 text-sm">{bullet}</li>
              ))}
              </ul>

              <div className="flex gap-2 mt-4 flex-wrap">
                {experience.techStack.map((tech, k) => (
                  <TechBadge key={k} tech={tech} />
                ))}
              </div>

            </div>
          </a>
        ))}
      </section>

      <section id="projects" className="-mt-20">
        <div className="inline-flex">
          <Link
            href="/projects"
            className="text-slate-200 hover:text-teal-300 flex items-center gap-1 transition-colors duration-150 group">
            View Full Project Archive
            <span className="inline-block transition-transform duration-150 group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </section>
      <section id="resume" className="lg:hidden -mt-13">
        <ResumeButton />
      </section>
    </div>
  );
}
