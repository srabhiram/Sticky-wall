"use client";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";
import ContextProvider from "../theme-provider";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loading from "./loading";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  suspense: true,
});

const MobileNavbar = dynamic(() => import("@/components/MobileNavbar"), {
  suspense: true,
});

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextProvider>
      <main className="flex gap-4 w-full">
        <div className={`${roboto.className} md:w-[15%] md:block hidden`}>
          <Navbar />
        </div>
        <div className="md:hidden block">
          <MobileNavbar />
        </div>
        <div className="md:w-[84%] max-h-full">
          <Toaster position="top-center" />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </main>
    </ContextProvider>
  );
}
