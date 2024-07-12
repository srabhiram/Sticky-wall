import Task from "@/models/task.models";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest){
    const reqparams = req.nextUrl.searchParams.get("id");
    const taskdelete = await Task.findByIdAndDelete(reqparams)
    console.log(taskdelete);
    return NextResponse.json({
        message: "Delete request success"
    })
}