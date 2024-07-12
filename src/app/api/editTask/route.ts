import { getTokenData } from "@/helpers/getTokeData";
import Task from "@/models/task.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqdata = await req.json();
    const {title, description, completed} = reqdata
  // Perform operations with user id
  const user = await Task.findByIdAndUpdate(reqdata._id,{
    title,
    description,
    completed,
    updatedAt: new Date(),
  });
  console.log(user);
  return NextResponse.json({reqdata},{status:201});
}
