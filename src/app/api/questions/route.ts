import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// This route handler is created to receive client-side api GET requests and fetch data from the backend securely
// NOTE: In order to access the client headers/cookies, you MUST call this endpoint from the client-side,
// because a call from a server-side will not include any cookies automatically, and you have to manually specify it in this case.
export async function GET(req: NextRequest) {
const token = await getToken({ req });
 const cookies = req.cookies
 const { searchParams } = new URL(req.url); // Get query params from request URL
const quizeId = searchParams.get("exam"); 

  if (!quizeId) {
    return NextResponse.json({ error: "Missing subject ID in query parameters" }, { status: 400 });
  }
  const response = await fetch(`${process.env.API}/questions?exam=${quizeId}`, {
    headers: {
      ...JSON_HEADER,
      token:token.token
    },
  });

console.log("res quiz",response)

 const payload = await response.json()
 console.log("payload quiz" , payload)
  return NextResponse.json(payload)

}
