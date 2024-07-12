import { TaskTypes } from "@/app/home/page";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { UserData } from "@/app/theme-provider";
import { taskType } from "@/app/home/addtask/page";
import axios from "axios";
import { Button } from "./ui/button";

interface props {
  bgColor: string[];
  index: number;
  data: TaskTypes;
}
export default function Card({ bgColor, index, data }: props) {
  const router = useRouter();

  const [taskData, setTaskData] = useState<taskType>({
    title: data.title,
    description: data.description,
    dueDate: "",
    user: "",
  });
  console.log(taskData);
  const handleChange = (e: any) => {
    e.preventDefault();
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
      user: data.user,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // add to database
    try {
      const res = await axios.post("/api/addtask", taskData);
    } catch (error: any) {
      console.log(error.message);
    }
    router.push("/home");
  };

  return (
    <>
      <div
        className={`relative ${
          bgColor[index % bgColor.length]
        } h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150`}
        key={index}
      >
        <div className="flex justify-between items-center">
          {" "}
          <h1 className="font-semibold text-2xl">{data.title}</h1>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger className="text-xl bg-transparent p-2 hover:bg-white/25 hover:rounded-full">
                <FaRegEdit />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit you Task</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    placeholder="Type here..."
                    className="px-4 py-5 md:w-1/2 rounded-xl shadow-sm outline-lime-400 focus:ring-lime-400 placeholder-slate-400 "
                  />
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    value={taskData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows={5}
                    className="outline-lime-400 focus:ring-lime-400 text-lg tracking-tight overflow-y-auto scroll-smooth rounded-xl resize-none w-1/2 p-3"
                  ></textarea>
                </div>

                <DialogFooter>
                  <Button
                    className="bg-lime-500 hover:bg-lime-600 active:bg-lime-300"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger className="text-xl bg-transparent p-2 hover:bg-white/25 hover:rounded-full">
                <MdDeleteOutline />
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-100">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your task and remove your task from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <p className="font-light">{data.description}</p>
        <div className="absolute bottom-0 right-0 self-end">
          <Button className="bg-lime-500 hover:bg-lime-600 active:bg-lime-300">
            Mark as completed
          </Button>
        </div>
      </div>
    </>
  );
}
