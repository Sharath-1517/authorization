"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


const VerifyEmail = () => {

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async() => {
    try {

      await axios.post('/api/users/verifyemail',{token});
      setVerified(true);

    } catch (error:any) {
      setError(true);
      console.log(error.response);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || "");
  }, [])

  useEffect(() => {
    if(token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="h-screen bg-gray-500 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-3">Verification of Email</h1>
      <p className="p-2 bg-gray-600 text-white rounded-md">{token ? `${token}` : "no token"}</p>
      {
        verified &&
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl">You have successfully verified your email.</h3>
          <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit ">Login</Link>
        </div>
      }
      {
        error &&
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl">There was an error verifying your email.</h3>
          <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit ">Login</Link>
        </div>
      }
    </div>
  )
}

export default VerifyEmail
