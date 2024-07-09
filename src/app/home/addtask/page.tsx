import React from "react";

export default function page() {
  return (
    <>
      <main className="w-full mx-2 my-3 p-3 rounded-lg">
        <header>
          <h1 className="font-playwrite font-bold text-[2.8rem]">New Task</h1>
        </header>
        <section className="mt-4 bg-gray-50 w-full  flex flex-col  items-center px-4 py-3 gap-6 ">
          <div className="w-full">
            <label htmlFor="text" className="text-2xl  font-bold block p-2">Title</label>
              <input type="text" placeholder="Type here..." className="px-4 py-5 w-1/2 rounded-xl shadow-sm outline-lime-400 focus:ring-lime-400 placeholder-slate-400 "/>
          </div>
          <div className="w-full">
           <textarea name="Your note" placeholder="Description" cols={45} rows={15} className="outline-lime-400 focus:ring-lime-400 rounded-xl resize-none w-1/2 font-playwrite p-3"/>
          </div>
        </section>
      </main>
    </>
  );
}
