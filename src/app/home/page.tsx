"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useAppContext } from "../theme-provider";
import axios from "axios";

export interface TaskTypes {
  map(arg0: (data: TaskTypes, index: number) => React.JSX.Element): React.ReactNode;
  title: String;
  description: String;
  completed: Boolean;
  createdAt: Date;
  dueDate: Date;
  user: String;
}
export default function HomePage() {
  const data = useAppContext();
  const [tasksData, setTasksData] = useState<TaskTypes | null>(null);
  useEffect(() => {
    try {
      axios
        .get("/api/tasks", { params: { user: data?._id } })
        .then((res) => setTasksData(res.data.data));
    } catch (error) {
      throw new Error(
        "Failed to fetch data from server. Please try again later."
      );
    }
  }, [data]);
  const bgColor = ["bg-green-400","bg-pink-400","bg-cyan-400", "bg-violet-400", "bg-rose-400", "bg-yellow-400", "bg-teal-400",]
  return (
    <>
      <main className=" w-full  mx-2 my-3 p-3 rounded-lg">
        <header className="font-playwrite md:text-[2.5rem] font-bold">
          All Tasks
        </header>
        <div className="flex justify-end mr-10 mb-3 font-playwrite text-lg font-bold">
          <Link
            href={"/home/addtask"}
            className="flex gap-3 items-center px-4 py-3 bg-lime-400 rounded-xl hover:scale-110 active:scale-95 active:bg-white transition-all duration-150"
          >
            {" "}
            <FaPlus />
            <span>Add task</span>
          </Link>
        </div>
        <section className="p-4 flex gap-5 flex-wrap">
          {tasksData &&
            tasksData.map((data: TaskTypes, index: number) => (
              <div
                className={`relative ${bgColor[index%bgColor.length]} h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150`}
                key={index}
              >
               <div className="flex justify-between items-center"> <h1 className="font-semibold text-2xl">{data.title}</h1><span>{new Date(data.dueDate).toISOString().slice(0,10)}</span></div>
                <p className="font-light">{data.description}</p>
              </div>
            ))}
          {/* <div className="relative bg-yellow-400 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="bg-red-400 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150">
            <Link href={`/home/task/ii`}>l</Link>
          </div>
          <div className="bg-blue-400 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="bg-violet-400 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="bg-green-400 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div>
          <div className="bg-teal-400 h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150"></div> */}
        </section>
      </main>
    </>
  );
}
