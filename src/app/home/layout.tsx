"use client"
import Navbar from "@/components/Navbar";
import { Roboto } from "next/font/google";
import ContextProvider from "../theme-provider";
import { Toaster } from "react-hot-toast";
import MobileNavbar from "@/components/MobileNavbar";


const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
        <ContextProvider>
          <main className="flex gap-5 w-full">
            <div
              className={`${roboto.className} md:w-[14%] md:block hidden `}
            >
              {" "}
              <Navbar />
            </div>
            <div className="md:hidden block  relative">
              <MobileNavbar/>
            </div>
            <div className="md:w-[84%] max-h-full ">
              <Toaster position="top-center"/>
              {children}
            </div>
          </main>
        </ContextProvider>
      
  );
}
