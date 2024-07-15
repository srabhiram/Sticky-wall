"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaRegUserCircle,
  FaSignOutAlt,
  FaTasks,
} from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { TbPlayerTrackNext } from "react-icons/tb";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/app/theme-provider";
import toast from "react-hot-toast";
import { cookies } from "next/headers";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { taskData } = useAppContext();

  const [allTaskCount, setAllTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [pendingTaskCount, setPendingTaskCount] = useState(0);

  useEffect(() => {
    if (taskData) {
      const completedTasks = taskData.filter((t) => t.completed);
      setCompletedTaskCount(completedTasks.length);
      setPendingTaskCount(taskData.length - completedTasks.length);
      setAllTaskCount(taskData.length);
    }
  }, [taskData]);

  const onLogout = async () => {
    try {
      await toast.promise(axios.get("/api/logout"), {
        loading: "Signing out...",
        success: "Successfully logged out",
        error: "Something went wrong",
      });
      cookies().set('token','')
      router.push("/login");
    } catch (error: any) {
      await toast.error(error.message);
    }
  };

  return (
    <main className="flex flex-col gap-5 w-full bg-gray-50 h-[43rem] mx-2 my-3 p-3 rounded-lg sticky top-2">
      <header className="flex justify-between items-center px-3">
        <h1 className="font-playwrite text-2xl font-bold">Sticky Wall</h1>
      </header>
      <section className="mt-2 w-full flex flex-col gap-[20rem]">
        <div className="flex flex-col  items-center gap-2 ">
          <div className="flex gap-2 items-center hover:bg-white hover:rounded-md hover:text-lime-600 cursor-pointer text-lg  px-4 py-2">
            <FaTasks />
            <Link
              href={`/home`}
              className={`${
                pathname === "/home" ? "text-lime-600" : ""
              } px-2 py-1 `}
            >
              All Tasks
            </Link>
            <span className="bg-white px-2 py-1 text-sm rounded-md">
              {allTaskCount}
            </span>
          </div>
          <div className="flex gap-2 items-center hover:bg-white hover:rounded-md hover:text-lime-600 cursor-pointer text-lg px-4 py-2">
            {" "}
            <TbPlayerTrackNext />
            <Link
              href={`/home/upcoming`}
              className={`${
                pathname === "/home/upcoming" ? "text-lime-600" : ""
              } px-2 py-1 `}
            >
              Pending
            </Link>{" "}
            <span className="bg-white px-2 py-1 text-sm rounded-md">
              {pendingTaskCount}
            </span>
          </div>
          <div className="flex gap-2 items-center hover:bg-white hover:rounded-md hover:text-lime-600 cursor-pointer text-lg px-4 py-2">
            {" "}
            <MdOutlineTaskAlt />
            <Link
              href={`/home/completed`}
              className={`${
                pathname === "/home/completed" ? "text-lime-600" : ""
              } px-2 py-1 `}
            >
              Completed
            </Link>
            <span className="bg-white px-2 py-1 text-sm rounded-md">
              {completedTaskCount}
            </span>
          </div>
        </div>
        <div className="flex flex-col mx-2 justify-center gap-2">
          <Link
            href={`/home/settings`}
            className="flex gap-3 px-2 py-1 text-lg items-center"
          >
            <FaRegUserCircle /> Settings
          </Link>
          {/*  */}
          <button
            onClick={onLogout}
            className="flex gap-3 px-2 py-1 text-lg items-center"
          >
            <FaSignOutAlt />
            Signout
          </button>
        </div>
      </section>
    </main>
  );
}
