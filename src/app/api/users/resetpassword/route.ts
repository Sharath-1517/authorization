import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';


connect();

export async function POST(request:NextRequest) {
  try {

    const reqbody = await request.json();
    const {password} = reqbody.user;
    const token = reqbody.token;

    if(token === undefined || token === null || token.length === 0) {
      return NextResponse.json({status: 500})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await User.findOne({forgotPasswordToken: token});

    const response = await User.updateOne(
      {_id: user._id},
      {
        password: hashedPassword,
        $unset: {
          forgotPasswordToken: "",
          forgotPasswordTokenExpiry: "",
        }
      }
    );

    if(response) {
      return NextResponse.json({status: 200});
    } else {
      console.log('wrong');
      
      return NextResponse.json({status: 400})
    }


  } catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}