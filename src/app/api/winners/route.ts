import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/Db/connection";
import { Winner } from "@/Db/schema";


connect();
export async function POST(request: NextRequest) {
    const winners = await Winner.find();
    return NextResponse.json(winners, {status: 200});
  }