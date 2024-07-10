import { connectDB } from "@/db/dbConfig";
import User from "@/models/users.models";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(req: NextRequest) {
  const reqbody = await req.json();
  const { fullname, email, password } = reqbody;
  if (!fullname || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const savedUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    console.log(savedUser);
    const res = NextResponse.json(
      {
        message: "User created successfully",
      },
      {
        status: 201, // Created
      }
    );
    return res;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
