"use client";
import Link from "next/link";
import React from "react";
import { FaAlignJustify, FaPlus, FaSignOutAlt, FaTasks } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineTaskAlt } from "react-icons/md";
import { TbPlayerTrackNext } from "react-icons/tb";

export default function Navbar() {
  // const [isOpen, setIsOpen] = React.useState(false);
  // const handlenavbar = () => {

  //   setIsOpen(!isOpen);
  // };
  return (
    <main
      className={`flex flex-col gap-5 w-full bg-gray-50 h-[53rem] max-h-screen mx-2 my-3 p-3 rounded-lg `}
    >
      <header className="flex justify-between    items-center px-3">
        <h1 className="font-playwrite text-3xl font-bold">Sticky Wall</h1>
      </header>
      <section className="mt-2 w-full flex flex-col gap-96">
        <div>
        <ul className="flex flex-col space-y-3">
          <li className="">
            Tasks
            <span className="flex flex-col gap-2 mx-2 mt-1 justify-center">
              <div className="flex items-center justify-center px-2 py-1 rounded-md hover:bg-white gap-5">
                <FaPlus />
                <Link
                  href={`/home/addtask`}
                  className="text-xl  font-medium hover:text-lime-600 transition-all duration-100"
                >
                  New Task
                </Link>
                <span className="px-3 py-1.5 rounded-sm bg-white self-end">
                  0
                </span>
              </div>

              <div className="flex items-center justify-center px-2 py-1 rounded-md hover:bg-white gap-5">
                <FaTasks />
                <Link
                  href={`/home`}
                  className="text-xl  font-medium hover:text-lime-600 transition-all duration-100"
                >
                  All Tasks
                </Link>
                <span className="px-3 py-1.5 rounded-sm bg-white self-end">
                  0
                </span>
              </div>
              <div className="flex items-center justify-center px-2 py-1 rounded-md hover:bg-white gap-5">
                <TbPlayerTrackNext />
                <Link
                  href={`/home/upcoming`}
                  className="text-xl  font-medium hover:text-lime-600 transition-all duration-100"
                >
                  Upcoming
                </Link>
                <span className="px-3 py-1.5 rounded-sm bg-white self-end">
                  0
                </span>
              </div>
              <div className="flex items-center justify-center px-2 py-1 rounded-md hover:bg-white gap-5">
                <MdOutlineTaskAlt />
                <Link
                  href={`/home/completed`}
                  className="text-xl  font-medium hover:text-lime-600 transition-all duration-100"
                >
                  Completed
                </Link>
                <span className="px-3 py-1.5 rounded-sm bg-white self-end">
                  0
                </span>
              </div>
            </span>
          </li>
        </ul>
        </div>
        <div className="flex flex-col mx-2 justify-center gap-2">
          <Link href={`/home/settings`} className="flex gap-3 px-2 py-1 text-lg  items-center">
            <IoIosSettings /> Settings
          </Link>
          <Link href={`/logout`} className="flex gap-3 px-2 py-1 text-lg items-center">
            <FaSignOutAlt />
            Signout
          </Link>
        </div>
      </section>
    </main>
  );
}
