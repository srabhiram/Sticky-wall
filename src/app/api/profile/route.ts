import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokeData";
import User from "@/models/users.models";
import { connectDB } from "@/db/dbConfig";

connectDB();
export async function GET(req: NextRequest) {
  try {
    const userId = await getTokenData(req);
    const user = await User.findById(userId).select("-password");
    return NextResponse.json(
      {
        message: "User found",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
