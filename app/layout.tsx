import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Te Po Spectre | Design System & Slot Demo',
  description: 'World-class design system and Te Po Spectre spectral night-realm slot demonstration by Spectre Industries. Entertainment only.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-tepo-void text-tepo-bone antialiased">
        {children}
      </body>
    </html>
  );
}
