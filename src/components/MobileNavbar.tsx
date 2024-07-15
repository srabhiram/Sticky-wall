import { useAppContext } from "@/app/theme-provider";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaRegUserCircle, FaSignOutAlt, FaTasks } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineTaskAlt } from "react-icons/md";
import { TbPlayerTrackNext } from "react-icons/tb";

export default function MobileNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { taskData } = useAppContext();
  const [popupMenu, setPopupMenu] = useState(false);
  const [allTaskCount, setAllTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [pendingTaskCount, setPendingTaskCount] = useState(0);

  useEffect(() => {
    setPopupMenu(false);
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
      router.push("/login");
      setPopupMenu(!popupMenu);
    } catch (error: any) {
      await toast.error(error.message);
    }
  };
  const handlePopup = () => {
    setPopupMenu(!popupMenu);
  };
  return (
    <>
      <section
        className={`${popupMenu && "h-44"} w-full fixed bottom-0 z-50 bg-white`}
      >
        {" "}
        {popupMenu && (
          <div className="relative h-[58%] bg-zinc-50    ">
            <div className="absolute top-0 flex flex-col justify-center gap-2 right-2">
              <Link
                href={`/home/settings`}
                className={`flex gap-2 px-2 py-1 text-lg items-center mt-2 `}
              >
                {" "}
                <FaRegUserCircle /> Profile
              </Link>
              <button
                onClick={onLogout}
                className="flex gap-2 px-2 py-1 text-lg items-center"
              >
                <FaSignOutAlt />
                Signout
              </button>
            </div>
          </div>
        )}
        <div className=" bg-zinc-50  mt-2 flex gap-2 items-center z-50">
          <Link
            href={`/home`}
            className={`${
              pathname === "/home" ? "bg-white text-lime-600" : ""
            }  flex flex-col relative text-sm items-center px-3 py-2 justify-center gap-1 border-l"`}
          >
            <FaTasks className="relative text-xl" />{" "}
            <span className="bg-lime-400 text-white px-2 py-1 absolute top-0 right-2 rounded-full text-[10px]  font-semibold">
              {allTaskCount}
            </span>
            All Tasks
          </Link>
          <Link
            href={`/home/upcoming`}
            className={`${
              pathname === "/home/upcoming" ? "bg-white text-lime-600" : ""
            }  flex flex-col relative text-sm items-center px-3 py-2 justify-center gap-2 border-l"`}
          >
            {" "}
            <TbPlayerTrackNext className=" text-2xl" />
            Pending
            <span className="bg-lime-400 text-white px-1 py-1 absolute top-0 right-2 rounded-full text-xs  font-semibold">
              {pendingTaskCount}
            </span>
          </Link>
          <Link
            href={`/home/addtask`}
            className="px-3 py-2 bg-lime-400 rounded-full flex justify-center items-center h-12 w-12"
          >
            <FaPlus />
          </Link>
          <Link
            href={`/home/completed`}
            className={`${
              pathname === "/home/completed" ? "bg-white text-lime-600" : ""
            }  flex flex-col relative text-sm items-center px-2 py-2 justify-center gap-2 border-l"`}
          >
            {" "}
            <MdOutlineTaskAlt className=" text-2xl" />
            Completed
            <span className="bg-lime-400 text-white px-2 py-1 absolute top-0 right-2 rounded-full text-xs  font-semibold">
              {completedTaskCount}
            </span>
          </Link>

          <div
            className={`active:bg-white active:text-lime-600 flex flex-col relative text-sm items-center px-2 py-2 justify-center gap-2 border-l`}
            onClick={handlePopup}
          >
            {popupMenu ? (
              <IoIosArrowDown className="text-2xl" />
            ) : (
              <IoIosArrowUp className="text-xl" />
            )}
            <span className="text-sm">More</span>
          </div>
        </div>
      </section>
    </>
  );
}
