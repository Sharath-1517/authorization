import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {

    const reqBody = await request.json()
    const { email, password } = reqBody;

        if (email?.length === 0 || email === null || email === undefined || password?.length === 0 || password === null || password === undefined) {
            return NextResponse.json({ error: "Email and password should not be empty" }, { status: 400 })
        }

        //check if user exists
        const user = await User.findOne({ email })
        if (!user || user === null) {
            return NextResponse.json({ error: "User does not exist or\nInvalid credentials" }, { status: 400 })
        } else {

            const passwordcomparation = await bcryptjs.compare(password, user.password);

            if (!passwordcomparation) {
                return NextResponse.json({ error: "Invalid password" }, { status: 400 });
            }
            //create token data(which data you want to tokenize);
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            }

            //create token
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

            const response = NextResponse.json({
                message: "Login successful",
                success: true,
            })
            response.cookies.set("token", token, {
                httpOnly: true,

            })
            return response;
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}