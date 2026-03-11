import type { Metadata } from "next";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "Jeff Zhang - Full Stack AI Engineer",
  description:
    "Full stack engineer focused on backend systems and AI-driven automation.",
  openGraph: {
    title: "Jeff Zhang - Full Stack AI Engineer",
    description:
      "Full stack engineer focused on backend systems and AI-driven automation.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-900">
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
