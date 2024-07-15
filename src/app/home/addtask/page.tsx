"use client";
import { useAppContext } from "@/app/theme-provider";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";
import toast from "react-hot-toast";
export interface taskType {
  _id?: string;
  title: string;
  description: string;
  user?: string | undefined;
}

export default function page() {
  const router = useRouter();
  const { data, fetchData, fetchTaskData } = useAppContext();
  const [taskData, setTaskData] = useState<taskType>({
    title: "",
    description: "",
    user: "",
  });
  const handleChange = (e: any) => {
    e.preventDefault();
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
      user: data?._id,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    toast
      .promise(axios.post("/api/addtask", taskData), {
        loading: "Saving Task...",
        success: "Task updated successfully!",
        error: "Error updating task!",
      })
      .then(() => {
        fetchData();
        fetchTaskData();
        router.push("/home");
      }); // refresh tasks list after adding new one
  };

  return (
    <>
      <main className="w-full  mx-2 my-3 p-3 rounded-lg">
        <header>
          <h1 className="font-playwrite font-bold text-2xl md:text-[2.8rem]">New Task</h1>
        </header>
        <section className="mt-4 w-full h-1/2  flex flex-col items-center  justify-center ">
          <div className="bg-zinc-50 md:w-3/5 rounded-md shadow-md h-1/2 flex flex-col justify-center px-4 py-3 gap-6">
            <div className="">
              <label htmlFor="text" className="text-xl md:text-2xl  font-bold block p-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={taskData.title}
                onChange={handleChange}
                placeholder="Type here..."
                className="px-4 py-5 md:w-1/2 rounded-xl shadow-sm outline-lime-400 focus:ring-lime-400 placeholder-slate-400 "
              />
            </div>
            <div className="">
              <textarea
                name="description"
                required
                value={taskData.description}
                onChange={handleChange}
                placeholder="Description"
                rows={5}
                className="outline-lime-400 focus:ring-lime-400 text-lg tracking-tight overflow-y-auto scroll-smooth rounded-xl resize-none md:w-1/2 p-3"
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
                className="px-4 py-2 text-gray-600 font-semibold rounded-md hover:text-gray-800 transition-all duration-100 "
              >
                Cancel
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
