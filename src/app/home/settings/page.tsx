"use client";

import { useAppContext } from "@/app/theme-provider";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function page() {
  const {data} = useAppContext();
  
  return (
    <>
      <main className="w-full  md:mx-2 my-3 md:p-3 rounded-lg">
        <header>
          <h1 className=" text-2xl md:text-[2.8rem] font-playwrite font-bold">Settings</h1>
        </header>
        <section className="flex justify-center w-full mt-2">
          <div className="bg-zinc-50   md:w-96 px-5 py-3 mx-2 md:m-5 rounded-md shadow-md">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="rounded-full w-24 h-24"><FaUserCircle className="w-24 text-8xl" /></div>
              <div className="font-semibold text-xl flex items-center flex-col justify-center">
                <h1>{data?.fullname}</h1>
                <h2 className="text-zinc-400">{data?.email}</h2>
              </div>{" "}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
