// app/api/calendar-user/route.ts
import { NextResponse } from "next/server";
import CalendarData from "@/app/components/calendar/server-api";

export async function GET() {
  try {
    const user = await CalendarData();
    return NextResponse.json(user);
  } catch (error: unknown) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
