import './globals.css';
import type { Metadata } from 'next';
import { IBM_Plex_Sans, Bebas_Neue, Michroma } from "next/font/google";
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';




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
  title: 'NextWizard - Build Modern Fullstack Web Applications',
  description: 'Your Next.js guide to build fullstack modern web applications with step-by-step tutorials and best practices',
  keywords: ['Next.js', 'React', 'Web Development', 'Fullstack', 'JavaScript', 'TypeScript', 'Tutorial'],
  authors: [{ name: 'Ali Hameed' }],
  creator: 'Ali Dev',
  publisher: 'Ali Hameed',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://next-wizard.vercel.app',
    title: 'NextWizard - Build Modern Fullstack Web Applications',
    description: 'Your Next.js guide to build fullstack modern web applications with step-by-step tutorials and best practices',
    siteName: 'NextWizard',
    images: [
      {
        url: 'https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png',
        width: 1200,
        height: 630,
        alt: 'NextWizard - Your Next.js Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextWizard - Build Modern Fullstack Web Applications',
    description: 'Your Next.js guide to build fullstack modern web applications',
    images: ['https://your-nextjs-app-url.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
       <body className={`${ibmPlexSans.className} ${bebasNeue.variable} ${michroma.variable} antialiased`}>
        <ThemeProvider >
          {children}
        </ThemeProvider>
          <Toaster />
        </body>   
    </html>
  );
}
