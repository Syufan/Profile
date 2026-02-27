import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { getProfile } from "@/services/api";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  try{
    const data = await getProfile();
    return{
      title: data.about.name,
      description: data.about.title,
      openGraph: {
        title: data.about.name,
        description: data.about.title,
      },
    }
  }catch(error) {
    console.error("Failed to fetch profile metadata:", error);
    throw error;
  }
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const data = await getProfile();
  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
      <Sidebar data={data}/>
      <main className="flex-1 px-6 py-8 lg:px-20 lg:pr-5 lg:py-16">
        {children}
      </main>
    </div>
  );
}
