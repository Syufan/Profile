import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jeff Zhang - Full Stack AI Engineer',
  description: 'Full stack engineer focused on backend systems and AI-driven automation.',
  openGraph: {
    title: 'Jeff Zhang - Full Stack AI Engineer',
    description: 'Full stack engineer focused on backend systems and AI-driven automation.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="bg-slate-900">
          {children}
        </body>
      </html>
    );
  }
