import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { getProfile } from "@/services/api";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  try{
    const data = await getProfile();
    return{
      title: data.name,
      description: data.title,
    }
  }catch{
    console.error("Failed to fetch profile metadata:", Error);
    throw Error;
  }
}

export default function RootLayout({ children }:{children: React.ReactNode;}){
  return(
    <html lang="en">
      <body className = "bg-slate-900">
        <div className="max-w-6xl mx-auto flex">
          <Sidebar />
          <main className = "flex-1 px-20 pr-5 py-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
