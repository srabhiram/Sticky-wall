"use client";
import React from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { TaskTypes, useAppContext } from "../theme-provider";
import Card from "@/components/Card";
import { bgColor } from "@/helpers/constants";
import { Toaster } from "react-hot-toast";


export default function HomePage() {
  const { taskData} = useAppContext();
  
  
  return (
    <>
      <main className=" w-full  mx-2 my-3 p-3 rounded-lg">
        <header className="font-playwrite md:text-[2.5rem] text-2xl font-bold">
          All Tasks
        </header>
        <div className="flex justify-end mr-10 mb-3 font-playwrite md:text-lg font-bold">
          <Link
            href={"/home/addtask"}
            className="md:flex hidden gap-3 items-center px-4 py-3 bg-lime-400 rounded-xl hover:scale-110 active:scale-95 active:bg-white transition-all duration-150"
          >
            {" "}
            <FaPlus />
            <span>Add task</span>
          </Link>
        </div>
        <section className="p-4 flex gap-5 flex-wrap">
          {taskData &&
            taskData
              .slice()
              .reverse()
              .map((data: TaskTypes, index: number) => (
                <Card
                
                  bgColor={bgColor}
                  data={data}
                  index={taskData.length - 1 - index}
                />
              ))}
        </section>
      </main>
    </>
  );
}
