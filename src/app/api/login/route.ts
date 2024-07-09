import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
 const res = NextResponse.json({
    message: "OK",
 })
 return res
}

export function POST(req: NextRequest) {
    const bodyData = req.body;
    
    const res = NextResponse.json({
    message: "POST Request Received",
    data : bodyData,
 },{
    status: 201, // Created
 })
 return res
}
