import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const res = NextResponse.json({
      message: "Logout Succefull",
      success: true,
    });
    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res;
  } catch (error: any) {
    throw new Error (error.message)
  }
}
