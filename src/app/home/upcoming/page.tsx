"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Card from "@/components/Card";
import { bgColor } from "@/helpers/constants";
import { useAppContext } from "@/app/theme-provider";

export interface TaskTypes {
  slice: any;
  reverse: any;
  length: number;
  map(arg0: (data: TaskTypes, index: number) => React.JSX.Element): React.ReactNode;
  _id:string
  title: string;
  description: string;
  completed: Boolean;
  createdAt: Date;
  dueDate: Date;
  user: string;
}

export default function HomePage() {
  const { data } = useAppContext();
  const [tasksData, setTasksData] = useState<TaskTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks", { params: { user: data?._id } });
        setTasksData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch data from server. Please try again later.", error);
      } finally {
        setLoading(false);
      }
    };

    if (data?._id) {
      fetchTasks();
    }
  }, [data?._id]);

  const upcomingTasks = tasksData.filter(task => task.completed===false);

  return (
    <>
      <main className="w-full mx-2 my-3 p-3 rounded-lg">
        <header className="font-playwrite md:text-[2.5rem] font-bold">Pending Tasks</header>
        <div className="flex justify-end mr-10 mb-3 font-playwrite text-lg font-bold">
          <Link
            href={"/home/addtask"}
            className="flex gap-3 items-center px-4 py-3 bg-lime-400 rounded-xl hover:scale-110 active:scale-95 active:bg-white transition-all duration-150"
          >
            <FaPlus />
            <span>Add task</span>
          </Link>
        </div>
        <section className="p-4 flex gap-5 flex-wrap">
          {
            upcomingTasks.length > 0 ? (
              upcomingTasks
                .slice()
                .reverse()
                .map((data: TaskTypes, index: number) => (
                  <Card
                    key={data._id}
                    bgColor={bgColor}
                    data={data}
                    index={upcomingTasks.length - 1 - index}
                  />
                ))
            ) : (
              <p>No pending tasks found.</p>
            )
          }
        </section>
      </main>
    </>
  );
}
