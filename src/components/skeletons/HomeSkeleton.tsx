import React from "react";

export default function HomeSkeleton() {
  return (
    <>
      <main className=" w-full  mx-2 my-3 p-3 rounded-lg">
        <header className="font-playwrite md:text-[2.5rem] w-25 h-16 font-bold animate-pulse bg-zinc-200"></header>
        <div className="flex justify-end mr-10 mb-3 font-playwrite w-25 h-16  text-lg font-bold"></div>
        <section className="p-4 flex gap-5 flex-wrap animate-pulse">
          <div className="relative bg-zinc-200 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="relative bg-zinc-200 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="relative bg-zinc-200 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="relative bg-zinc-200 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="relative bg-zinc-200 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="relative bg-zinc-200 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
        </section>
      </main>
    </>
  );
}
