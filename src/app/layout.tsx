import type { Metadata } from "next";
import { Oswald, Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.scss";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Medias Chronicles",
  description: "An interactive historical timeline showcasing the rich history of Mediaș, from medieval settlements to present day. Explore the cultural heritage and significant events of Transylvania.",
  keywords: ["Mediaș history", "Transylvania", "medieval timeline", "Saxon heritage", "Romanian history"],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Medias Chronicles',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#D5C5AB',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "Mediaș History Timeline",
    description: "Interactive historical timeline of Mediaș, Transylvania",
    type: "website",
    locale: "ro_RO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/web-app-manifest-192x192.png" />
      </head>
      <body className={`${oswald.variable} ${cormorant.variable} ${lato.variable}`}>
<a href="mailto:someone@example.com
?subject=Inquiry%20from%20Website
&body=Please%20fill%20in%20the%20details%20below:%0D%0A%0D%0A
Name:%20%0D%0A
Email:%20%0D%0A
Company:%20%0D%0A
Phone:%20%0D%0A%0D%0A
Message:%0D%0A
--------------------%0D%0A
%0D%0A%0D%0A
Sent%20from%20yoursite.com">
Send Mail
</a>
        {children}
      </body>
    </html>
  );
}
