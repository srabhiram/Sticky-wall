"use client";
import { useAppContext, UserData } from "@/app/theme-provider";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import React, { useContext, useState } from "react";
interface taskType {
  title: string;
  description: string;
  dueDate: string;
  user: string | undefined;
}
export default function page() {
  const router = useRouter();
  const UserData: UserData | null = useAppContext();
  const [taskData, setTaskData] = useState<taskType>({
    title: "",
    description: "",
    dueDate: "",
    user: "",
  });
  const handleChange = (e: any) => {
    e.preventDefault();
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
      user: UserData?._id,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // add to database
    try {
      const res = await axios.post("/api/addtask", taskData);
      console.log(res.data.data);
    } catch (error: any) {
      console.log(error.message);
    }
    router.push('/home')
  };

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
                name="title"
                value={taskData.title}
                onChange={handleChange}
                placeholder="Type here..."
                className="px-4 py-5 w-1/2 rounded-xl shadow-sm outline-lime-400 focus:ring-lime-400 placeholder-slate-400 "
              />
            </div>
            <div className="">
              <textarea
                name="description"
                value={taskData.description}
                onChange={handleChange}
                placeholder="Description"
                rows={5}
                className="outline-lime-400 focus:ring-lime-400 text-lg tracking-tight overflow-y-auto scroll-smooth rounded-xl resize-none w-1/2 p-3"
              />
            </div>
            <div className="flex  items-center gap-2">
              <h1 className="font-bold">Due Date:</h1>
              <input
                type="date"
                value={taskData.dueDate}
                onChange={handleChange}
                name="dueDate"
                className="bg-transparent border p-1"
              />
            </div>
            <div className="self-end p-4 mr-4">
              <button
                className="px-4 py-2 bg-lime-500 text-white font-semibold rounded-md hover:bg-lime-600 transition-all duration-100 active:bg-lime-300"
                onClick={handleSubmit}
              >
                Save
              </button>
              <Link
                href={`/home`}
                className="px-4 py-2 text-gray-600 font-semibold rounded-md hover:text-gray-800 transition-all duration-100"
              >
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
