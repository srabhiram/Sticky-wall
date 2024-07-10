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
