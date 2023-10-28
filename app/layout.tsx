import "./globals.css";
import {Metadata} from "next";
import { Poppins } from 'next/font/google';
import Navbar from "@/app/components/nav/Navbar";
import Footer from "@/app/components/footer/Footer";

const poppins = Poppins({ subsets: ["latin"], weight:
['400', '700']});

export const metadata: Metadata = {
  title: "Suplementarnia",
  description: "suplementarnia"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
      <div className="flex flex-col min-h-screen">
          <Navbar/>
          <main className="flex-grow">{children}</main>
          <Footer/>
      </div>
      </body>
    </html>
  )
}
