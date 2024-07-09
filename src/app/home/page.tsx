import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { FaPlus, FaTasks } from "react-icons/fa";
export default function HomePage() {
  return (
    <>
      <main className=" w-full mx-2 my-3 p-3 rounded-lg">
        <header className="font-playwrite md:text-[2.8rem] font-bold">
          All Tasks
        </header>
        <div className="flex justify-end mr-10 mb-3 font-playwrite text-lg font-bold">
        <Link href={"/home/addtask"} className="flex gap-3 items-center px-4 py-3 bg-lime-400 rounded-xl hover:scale-110 active:scale-95 active:bg-white transition-all duration-150"> <FaPlus />
          <span >
            Add task
          </span></Link>
        </div>
        <section className="p-4 flex gap-5 flex-wrap">
          <div className="relative bg-yellow-400 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="bg-red-400 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150">
            <Link href={`/home/task/ii`}>l</Link>
          </div>
          <div className="bg-blue-400 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="bg-violet-400 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="bg-green-400 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="bg-teal-400 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
        </section>
      </main>
    </>
  );
}
