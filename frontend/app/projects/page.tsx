import { getProjects } from "@/services/api";
import { getProfile } from "@/services/api";
import { Project } from "@/types";
import { FaGithub } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import TechBadge from "@/components/TechBadge";
import Link from "next/link";

export default async function ProjectsPage() {
    const [projects, data] = await Promise.all([getProjects(), getProfile()]);

    return (
        <div className="py-16 px-6 lg:px-20 min-h-screen bg-slate-900">
            <Link href="/" className="text-teal-300 text-base flex items-center gap-1 group transition-colors duration-150">
                <span className="inline-block transition-transform duration-150 group-hover:-translate-x-1.5">←</span>
                {data.about.name}
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-1">All Projects</h1>

            {/* desktop->table */}
            <table className="hidden lg:table w-full mt-12 border-collapse">
                <thead>
                    <tr className="text-slate-200 text-sm border-b border-slate-700 font-normal">
                        <th className="text-left py-4 w-16">Year</th>
                        <th className="text-left py-4 w-135">Project</th>
                        <th className="text-left py-4 max-w-xs">Built with</th>
                        <th className="text-left py-4 w-20">Link</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project: Project) => (
                        <tr key={project.name} className="border-b border-slate-700">
                            <td className="py-4 text-slate-400 text-sm">{project.year}</td>
                            <td className="py-4 w-80 max-w-xs">
                                <p className="text-white font-semibold">{project.name}</p>
                                <p className="text-slate-400 text-sm mt-1">{project.description}</p>
                            </td>

                            <td className="py-4 max-w-xs">
                                <div className="flex gap-2 flex-wrap">
                                    {project.techStack.map((tech, j) => (
                                        <TechBadge key={j} tech={tech} />
                                    ))}
                                </div>
                            </td>
                            <td className="py-4 max-w-xs">
                                <div className="flex flex-wrap items-center gap-3">
                                    {project.url.live && (
                                    <a href={project.url.live} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-300 transition-colors duration-150">
                                        <FiGlobe size={25} />
                                    </a>
                                    )}
                                    {project.url.github && (
                                    <a href={project.url.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-300 transition-colors duration-150">
                                        <FaGithub size={25} />
                                    </a>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* mobile->cards */}
            <div className="lg:hidden mt-8 flex flex-col">
                {projects.map((project: Project) => (
                    <div key={project.name} className="py-6">
                        <p className="text-slate-400 text-sm">{project.year}</p>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-white font-semibold">{project.name}</p>
                            <div className="flex gap-3">
                                {project.url.live && (
                                    <a href={project.url.live} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-300 transition-colors duration-150">
                                        <FiGlobe size={20} />
                                    </a>
                                )}
                                {project.url.github && (
                                    <a href={project.url.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-300 transition-colors duration-150">
                                        <FaGithub size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mt-2">{project.description}</p>
                        <div className="flex gap-2 mt-4 flex-wrap">
                            {project.techStack.map((tech: string, j: number) => (
                                <TechBadge key={j} tech={tech} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
