import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // 👈 import Providers wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artistly | Book Performing Artists",
  description: "Artistly.com - Book singers, dancers, DJs, speakers and more for your events.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Artistly | Book Performing Artists",
    description: "Artistly.com - Book singers, dancers, DJs, speakers and more for your events.",
    url: "https://artistly.vercel.app/",
    siteName: "Artistly",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Artistly - Book Performing Artists",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artistly | Book Performing Artists",
    description: "Artistly.com - Book singers, dancers, DJs, speakers and more for your events.",
    images: ["/images/og-image.png"],
    creator: "@artistly",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme || theme === 'system') {
                    localStorage.setItem('theme', 'light');
                    document.documentElement.classList.remove('dark');
                  } else if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300 bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
