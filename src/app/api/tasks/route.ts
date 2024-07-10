import { connectDB } from "@/db/dbConfig";
import Task from "@/models/task.models";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(req: NextRequest) {
  try {
    const reqData = req.nextUrl.searchParams.get("user");
    
    const tasks = await Task.find({user:reqData})
    return NextResponse.json({
      message: "Tasks found",
      data: tasks,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
