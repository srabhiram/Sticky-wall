import { connectDB } from "@/db/dbConfig";
import Task from "@/models/task.models";
import User from "@/models/users.models";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("data: "+data)
  const { title, description, completed, user } = data;
  try {
    const task = new Task({
      title,
      description,
      completed,
      
      user,
    })
    await task.save();
    const updatedData = await User.findByIdAndUpdate(task.user, { $push: { tasks: task } });
    console.log(updatedData)
    return NextResponse.json(
      {
        task:task.user,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
