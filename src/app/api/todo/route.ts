import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  return NextResponse.json({ message: "GET request successful" });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  return NextResponse.json({ message: "POST request successful", data: body });
};

// export const PUT = (request: NextRequest) => {
//     return NextResponse.json({ message: "GET request successful" });
// };

// export const DELETE = (request: NextRequest) => {
//     return NextResponse.json({ message: "GET request successful" });
// };
