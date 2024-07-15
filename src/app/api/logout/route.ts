import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = cookies();
  cookie.set('token', '',{
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production', // Expire the cookie immediately.
  })
  try {
    const res = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });
  

    return res;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
