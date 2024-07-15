import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });

    // Clear the token cookie by setting it with an expired date
    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expire the cookie
      path: "/", // Ensure the path matches where the cookie was set
      sameSite: "lax", // Set the sameSite attribute for better security
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    }, {
      status: 500
    });
  }
}
