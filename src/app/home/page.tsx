"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import Link from "next/link";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { useAppContext } from "../theme-provider";
import axios from "axios";
import Card from "@/components/Card";
import { bgColor } from "@/helpers/constants";

export interface TaskTypes {
  slice: any;
  reverse: any;

  length: number;
  map(
    arg0: (data: TaskTypes, index: number) => React.JSX.Element
  ): React.ReactNode;
  title: string;
  description: string;
  completed: Boolean;
  createdAt: Date;
  dueDate: Date;
  user: string;
}
export default function HomePage() {
  const { taskData} = useAppContext();
  
  
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
