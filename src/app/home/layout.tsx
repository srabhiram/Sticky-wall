"use client"
import Navbar from "@/components/Navbar";
import { Roboto } from "next/font/google";
import ContextProvider from "../theme-provider";
import { Toaster } from "react-hot-toast";
import MobileNavbar from "@/components/MobileNavbar";
import { Suspense } from "react";
import Loading from "./loading";


const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
        <ContextProvider>
          <Suspense fallback={<Loading/>}>
          <main className="flex gap-4 w-full">
            <div
              className={`${roboto.className} md:w-[15%] md:block hidden `}
            >
              {" "}
              <Navbar />
            </div>
            <div className="md:hidden block">
              <MobileNavbar/>
            </div>
            <div className="md:w-[84%] max-h-full ">
              <Toaster position="top-center"/>
              {children}
            </div>
          </main></Suspense>
        </ContextProvider>
      
  );
}
