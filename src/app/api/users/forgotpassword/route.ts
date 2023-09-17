
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request:NextRequest) {
  try {
    const reqBody = await request.json();
    const {email} = reqBody;

    const user = await User.findOne({email});

    if(!user) {
      return NextResponse.json({error: "User does not exist"}, {status: 400})
    }

    const tokenData = {
      email: email
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!);

    await sendEmail({email, emailType:"RESET", userId: user.id});

    return NextResponse.json({
      status: 200
    })

  } catch (error:any) {

    console.log(error);
    
    return NextResponse.json({error: error.message}, {status: 500});

  }
}