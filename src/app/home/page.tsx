"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import dynamic from 'next/dynamic';
import { TaskTypes, useAppContext } from "../theme-provider";
import { bgColorForCard } from "@/helpers/constants";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import Spinner from "@/components/skeletons/Spinner";

// Dynamically import the Card component
const Card = dynamic(() => import('@/components/Card'), {
  loading: () => <HomeSkeleton/>
});

export default function HomePage() {
  const { taskData } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching or heavy computation
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust time as needed
  }, []);

  if (loading) {
    return <Spinner/> // Loading state
  }

  return (
    <>
      <main className="w-full  my-3 px-1 rounded-lg">
        <header className="font-playwrite md:text-[2.5rem] text-2xl font-bold pb-2 px-5">
          All Tasks
        </header>
        <div className="flex justify-end mr-10 mb-3 font-playwrite md:text-lg font-bold">
          <Link
            href={"/home/addtask"}
            className="md:flex hidden gap-3 items-center px-4 py-3 bg-lime-400 rounded-xl hover:scale-110 active:scale-95 active:bg-white transition-all duration-150"
          >
            <FaPlus />
            <span>Add task</span>
          </Link>
        </div>
        <section className="p-4  flex gap-5 flex-wrap">
          {taskData &&
            taskData
              .slice()
              .reverse()
              .map((data: TaskTypes, index: number) => (
                <Card
              
                  bgColorCard={bgColorForCard}
                  data={data}
                  index={taskData.length - 1 - index}
                />
              ))}
        </section>
       
      </main>
    </>
  );
}
