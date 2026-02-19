import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("Received Data:", body);

  return NextResponse.json({
    message: "Message received successfully",
    success: true,
  });
}
