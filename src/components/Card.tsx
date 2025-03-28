"use client";
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
import { Switch } from "@/components/ui/switch";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  TaskTypes,
  useAppContext,
} from "@/app/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import axios from "axios";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { timeAgo } from "@/helpers/getTimeagoFunction";
import Details from "./Details";

interface props {
  bgColorCard: string[];
  index: number;
  data: TaskTypes;
}
interface TaskData {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}
export default function Card({ bgColorCard, index, data }: props) {
  const { fetchData, fetchTaskData } = useAppContext();
  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState<TaskData>({
    _id: data._id,
    title: data.title,
    description: data.description,
    completed: data.completed,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e: any) => {
    setOpen(false);
    e.preventDefault();
    // add to database
    toast
      .promise(axios.post("/api/editTask", taskData), {
        loading: "Saving changes...",
        success: "Changes saved successfully!",
        error: "Failed to save changes. Please try again later.",
      })
      .then(() => {
        fetchData();
        fetchTaskData();
      });
  };
  const handleDelete = async () => {
    toast
      .promise(
        axios.delete(`/api/deleteTask`, {
          params: { id: taskData._id },
        }),
        {
          loading: "Deleting task...",
          success: "Task deleted successfully!",
          error: "Failed to delete task. Please try again later.",
        }
      )
      .then(() => {
        fetchData();
        fetchTaskData();
      });
  };

  const handleComplete = async (checked: boolean) => {
    const updatedTaskData = { ...taskData, completed: checked };
    setTaskData(updatedTaskData);

    try {
      await toast.promise(axios.post("/api/editTask", updatedTaskData), {
        loading: "Saving changes...",
        success: "Changes saved successfully!",
        error: "Failed to save changes. Please try again later.",
      });
      fetchData();
      fetchTaskData();
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <>
      <div
        className={`relative ${
          bgColorCard[index % bgColorCard.length]
        } relative h-72 w-72 p-4 rounded-2xl hover:scale-105 transition-all duration-150`}
        key={index}
      >
        <div className="flex justify-between items-center">
          {" "}
          <h1 className="font-semibold text-2xl">{data.title}</h1>
          <div className="flex items-center gap-3">
            <Switch
              name="completed"
              checked={taskData.completed}
              onCheckedChange={handleComplete}
              className={` data-[state=checked]:bg-transparent/50 data-[state=unchecked]:bg-transparent/30`}
            />

            <DropdownMenu>
              <DropdownMenuTrigger className="hover:bg-white/25 mt-1 p-2 hover:rounded-full">
                <button>
                  {" "}
                  <BsThreeDotsVertical />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="backdrop-blur-xl bg-white/25 border-0">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger className="text-[17px] w-full flex justify-around items-center p-2 hover:bg-slate-50/40">
                    <FaRegEdit className="text-[15px]" /> {` `} Edit
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit you Task</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
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
                        rows={3}
                        className="outline-lime-400 border focus:ring-lime-400 text-lg tracking-tight overflow-y-auto scroll-smooth rounded-xl resize-none w-1/2 p-3"
                      ></textarea>
                      <div className="flex items-center gap-2">
                        <label htmlFor="completed">Completed</label>
                        <Switch
                          name="completed"
                          onCheckedChange={(checked) =>
                            setTaskData({ ...taskData, completed: checked })
                          }
                          checked={taskData.completed}
                          className="data-[state=checked]:bg-lime-400"
                        />
                      </div>
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
                </Dialog>{" "}
                <AlertDialog>
                  <AlertDialogTrigger className="text-[17px] w-full p-2 hover:bg-slate-50/40 flex items-center justify-around">
                    <MdDeleteOutline /> {` `} Delete
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-zinc-100">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your task and remove your task from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-700"
                        onClick={handleDelete}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Details data={data} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="font-light">{data.description}</p>
        <div className="flex absolute bottom-2 right-4 justify-end gap-2">
          {timeAgo(data.createdAt)}
        </div>
      </div>
    </>
  );
}
