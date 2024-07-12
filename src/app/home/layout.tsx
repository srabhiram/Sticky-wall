"use client"
import Navbar from "@/components/Navbar";
import { Roboto } from "next/font/google";
import ContextProvider from "../theme-provider";
import HomePage from "./page";
import { Suspense } from "react";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import Loading from "./loading";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <div className="flex gap-5 w-full">
            <div
              className={`${roboto.className} md:w-[14%] w-[97%] max-sm:hidden `}
            >
              {" "}
              <Navbar />
            </div>
            <div className="md:w-[84%] max-h-full ">
              <Suspense fallback={<Loading />}> {children}</Suspense>
            </div>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
