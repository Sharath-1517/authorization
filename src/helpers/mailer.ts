import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}:any) => {
  try {
    // Token generation;

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if(emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000
        }
      )
    } else if(emailType==="RESET") {
      await User.findByIdAndUpdate(userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000
        }
      )
    }

    "use strict";
    const nodemailer = require("nodemailer");
    
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: `${process.env.MAILER_USERID}`,
        pass: `${process.env.MAILER_PASSWORD}`
      }
    });

    const html = 
    `<p>Copy and paste the below link in your browser<br/>${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}</p>
    `;

    const mailOptions = {
      from: 'sharathlingam10@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: html
    }

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;


  } catch (error:any) {
    throw new Error(error.message);
  }
}