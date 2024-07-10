import { connectDB } from "@/db/dbConfig";
import User from "@/models/users.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connectDB();

export async function POST(req: NextRequest) {
  const reqbody = await req.json();
  const { email, password } = reqbody;

  // Check if email and password are provided
  if (!email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    // create token data
    const tokenData = {id:user._id}
    // generate token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!)
    const res = NextResponse.json(
      {
        message: "Login successfully",
      },
      {
        status: 200
      }
    );
    res.cookies.set("token", token,{
      httpOnly: true
    })
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal server error: " + error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
