"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Card from "@/components/Card";
import { bgColor } from "@/helpers/constants";
import { TaskTypes, useAppContext } from "@/app/theme-provider";



export default function HomePage() {
const {taskData} = useAppContext();
 
  const completedTasks = taskData.filter((task) => task.completed);

  return (
    <>
      <main className="w-full mx-2 my-3 p-3 rounded-lg">
        <header className="font-playwrite md:text-[2.5rem] text-2xl font-bold">
          Completed Tasks
        </header>
        <div className="flex justify-end mr-10 mb-3 font-playwrite text-lg font-bold">
          <Link
            href={"/home/addtask"}
            className="md:flex gap-3 hidden  items-center px-4 py-3 bg-lime-400 rounded-xl hover:scale-110 active:scale-95 active:bg-white transition-all duration-150"
          >
            <FaPlus />
            <span>Add task</span>
          </Link>
        </div>
        <section className="p-4 flex gap-5 flex-wrap">
          {completedTasks.length > 0 ?
            completedTasks.slice()
            .reverse()
            .map((data: TaskTypes, index: number) => (
              <Card key={index} data={data} index={index} bgColor={bgColor} />
            )): "No tasks completed"}
        </section>
      </main>
    </>
  );
}
