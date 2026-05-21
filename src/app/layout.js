import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'DocAppoint | Best Doctor Booking',
    template: '%s | DocAppoint'
  },
  description: 'Connect with certified medical experts dedicated to your well-being.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" 
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-black m-0 p-0 overflow-x-hidden w-full">
        
        <Navbar />
        
        <main className="flex-1 w-full">
          {children}
        </main>
        
        <Footer />
        <Toaster
  position="top-right"
  toastOptions={{
    style: {
      marginTop: '50px',
      marginRight: '20px'
    }
  }}
/>
        
      </body>
    </html>
  );
}