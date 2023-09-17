"use client"

import { useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [button, setButton] = useState("Submit")

  const router = useRouter()

  const handleClick = async() => {
    try {
      setButton("Loading request...");
      if(email.length <= 0) {
        toast.error("Invalid email address");
        setButton("Submit");
      } else {
        const response = await axios.post('/api/users/forgotpassword', {email});
        if(response.status === 200) {
          toast.success("Reset link sent to your email");
          setButton("Submit");
          router.push('/login');
        }
      }
    } catch (error:any) {
      toast.error(error.message)
    } finally {
      setButton("Submit");
      // setEmail("");
    }
  };


  return (
    <div className='h-screen grid place-items-center'>
      <Toaster />
      <div className="flex flex-col justify-start gap-1">
        <label htmlFor="email">Enter the registered email</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="cursor-pointer p-2 rounded-md border-[1px] border-gray-500 focus:border-black focus:outline-none" />
        <button type="submit" className="p-2 rounded-md border-[1px] border-gray-500 focus:border-black focus:outline-none mt-3 w-fit hover:bg-black hover:text-white disabled:cursor-not-allowed" disabled={button === "Loading request..." ? true : false} onClick={handleClick}>{button}</button>
        <Link href="/login" className="hover:underline mt-3">Login</Link>
      </div>
    </div>
  )
}

export default ForgotPassword
