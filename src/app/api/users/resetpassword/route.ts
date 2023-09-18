import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { passwordVerifier } from "@/utils/verification";


connect();

export async function POST(request:NextRequest) {
  try {

    const reqbody = await request.json();
    const {password, confirmPassword} = reqbody.user;
    const token = reqbody.token;


    if(passwordVerifier(password) || password !== confirmPassword) {
      return NextResponse.json({error: "Password must contain atleast 6 characters\nBoth passwords must be the same"},{status: 400})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await User.findOne({forgotPasswordToken: token});

    if(!user) {
      return NextResponse.json({error: "Invalid token"},{status: 400})
    }

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
      return NextResponse.json({message: "Password updated successfully"}, {status: 200});
    } else {
      return NextResponse.json({error: "Invalid token"}, {status: 400})
    }


  } catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}