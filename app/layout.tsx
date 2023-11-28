import "./globals.css";
import {Metadata} from "next";
import {Poppins} from 'next/font/google';
import Navbar from "@/app/components/nav/Navbar";
import Footer from "@/app/components/footer/Footer";
import React from "react";
import CartProvider from "@/providers/CartProvider";
import {Toaster} from "react-hot-toast";
import Categories from "@/app/components/nav/Categories";
import List from "@/app/components/list/List";



const poppins = Poppins({
    subsets: ["latin"], weight:
        ['400', '700']
});

export const metadata: Metadata = {
    title: "Suplementarnia",
    description: "suplementarnia"
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <body className={`${poppins.className} text-slate-700`}>
        <Toaster
            toastOptions={{
                style: {
                    background: "rgb(17,183,0)",
                    color: "white",
                },
            }}
        />
        <CartProvider>
            <div className="flex flex-col min-h-screen">
                <Navbar/>
                <main className="flex-grow">{children}</main>
                <Footer/>
            </div>
        </CartProvider>

        </body>
        </html>
    )
}
