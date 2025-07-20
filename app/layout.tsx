import './globals.css';
import type { Metadata } from 'next';
import { IBM_Plex_Sans, Bebas_Neue, Michroma } from "next/font/google";
import { Toaster } from '@/components/ui/toaster';



const ibmPlexSans = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-sans"
});

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas-neue"
});

const michroma = Michroma({
  weight: ["400"], // Michroma only has 400
  subsets: ["latin"],
  display: "swap",
  variable: "--font-michroma"
});

export const metadata: Metadata = {
  title: 'NextWizard',
  description: 'Your Next.js giude to build fullstack modern web applications',
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <head>
      </head>
       <body className={`${ibmPlexSans.className} ${bebasNeue.variable} ${michroma.variable} antialiased`}>
        {children}
          <Toaster />
        </body>   
    </html>
  );
}
