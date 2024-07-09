import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <main className="w-full  mx-2 my-3 p-3 rounded-lg">
        <header>
          <h1 className="font-playwrite font-bold text-[2.8rem]">New Task</h1>
        </header>
        <section className="mt-4 w-full h-1/2  flex flex-col items-center  justify-center ">
          <div className="bg-zinc-50 w-3/5 rounded-md shadow-md h-1/2 flex flex-col justify-center px-4 py-3 gap-6">
            <div className="">
              <label htmlFor="text" className="text-2xl  font-bold block p-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="px-4 py-5 w-1/2 rounded-xl shadow-sm outline-lime-400 focus:ring-lime-400 placeholder-slate-400 "
              />
            </div>
            <div className="">
              <textarea
                name="Your note"
                placeholder="Description"
                rows={5}
                className="outline-lime-400 focus:ring-lime-400 text-lg tracking-tight overflow-y-auto scroll-smooth rounded-xl resize-none w-1/2 p-3"
              />
            </div>
            <div className="flex  items-center gap-2">
              <h1 className="font-bold">Due Date:</h1>
              <input
                type="date"
                name="date"
                className="bg-transparent border p-1"
              />
            </div>
            <div className="self-end p-4 mr-4">
            <button className="px-4 py-2 bg-lime-500 text-white font-semibold rounded-md hover:bg-lime-600 transition-all duration-100">
              Save
            </button>
            <Link href={`/home`} className="px-4 py-2 text-gray-600 font-semibold rounded-md hover:text-gray-800 transition-all duration-100">
              Cancel
            </Link>

           

            {/* <button className="px-4 py-2 text-red-600 font-semibold rounded-md hover:text-red-800 transition-all duration-100">
              Delete Task
            </button> */}
          </div>
          </div>
          
        </section>
      </main>
    </>
  );
}
