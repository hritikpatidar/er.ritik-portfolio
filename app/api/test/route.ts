import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  await connectDB();
  const catalogs = await mongoose.connection
    .collection("catalogs")
    .find({})
    .toArray();

  return NextResponse.json(catalogs);
}
