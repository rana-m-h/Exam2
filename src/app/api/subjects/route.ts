import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// This route handler is created to receive client-side api GET requests and fetch data from the backend securely
// NOTE: In order to access the client headers/cookies, you MUST call this endpoint from the client-side,
// because a call from a server-side will not include any cookies automatically, and you have to manually specify it in this case.
export async function GET(req: NextRequest) {
  const token = await getToken({ req });
 const cookies = req.cookies

  const response = await fetch(process.env.API + "/subjects", {
    headers: {
      ...JSON_HEADER,
      token:token.token
    },
  });


 const payload = await response.json()
  return NextResponse.json(payload)

}
