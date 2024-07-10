import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function getTokenData(req: NextRequest) {
  // Your logic to extract and return token data goes here
  try {
    const token = req.cookies.get("token")?.value || "";
    const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
