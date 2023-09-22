import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/Db/connection";
import { Winner } from "@/Db/schema";
import {z} from "zod";

connect();


export async function POST(request: NextRequest) {
  const data =await request.json();
  const info = z.object({
    PlayerName: z.string().min(1).max(20),
    PlayerImage: z.string().min(1).max(200),
    PlayerEmail: z.string().email(),
    movesTaken: z.number().max(200),
    gameModeName: z.string().max(10),
    time_taken: z.number()
  })
  const user = info.safeParse(data);
  if(!user.success){
    return NextResponse.json({ message: "Invalid Data"},{status: 400});
  }
  else{
  const name = user.data.PlayerName;
  const image = user.data.PlayerImage;
  const email = user.data.PlayerEmail;
  const moves = user.data.movesTaken;
  const gameMode = user.data.gameModeName;
  const timeTaken = user.data.time_taken;
  await Winner.create({name:name, image:image, email:email, moves:moves, gameMode: gameMode, timeTaken: timeTaken});
  return NextResponse.json({ message: "ok"},{status: 200});
  }
}