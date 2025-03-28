import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TaskTypes } from "@/app/theme-provider";
import { formatDateTime } from "@/helpers/TimeDateFormat";

type props = {
  data: TaskTypes;
};
export default function Details({ data }: props) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className=" text-[17px] flex items-center justify-around w-full p-2 hover:bg-slate-50/40">
          <IoIosInformationCircleOutline /> {` `} Details
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
            <DialogDescription></DialogDescription>
            <p>
              Created at: <span>{formatDateTime(data.createdAt)}</span>
            </p>
            <p>
              Updated at: <span>{formatDateTime(data.updatedAt)}</span>
            </p>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
