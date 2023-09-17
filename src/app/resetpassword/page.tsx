"use client"

import toast, {Toaster} from 'react-hot-toast';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ResetPage = () => {

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    password: "",
    confirmPassword: ""
  })
  const router = useRouter();

  const changePassword = async() => {
    try {
      setLoading(true);
      if((user.password === user.confirmPassword) && (user.password.length >= 3) && (user.confirmPassword.length >= 3) ) {

        const response = axios.post('/api/users/resetpassword', {user, token});
        const {status} = await response;
        if(status === 200) {
          router.push('/login');
          toast.success("Successfully changed password")
        } else {
          router.push('/login');
          toast.error("Something went wrong")
        }
        setLoading(false);
      }      
      else if((user.password !== user.confirmPassword) || (user.password.length < 3) || (user.confirmPassword.length < 3)) {
        toast.error("Both password and confirm password must be same and must contain atleast 3 characters!")
      }
    } catch (error:any) {
      setLoading(false);
      toast.error(error.message);
      router.push('/login')
    }
  }

  const tokenSetter = (urlToken:string) => {
    setToken(urlToken);
  }
  
  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    if(urlToken === null || urlToken === undefined || urlToken.length === 0) { 
      setDisabled(true)
    } else {
      setDisabled(false)
      tokenSetter(urlToken);
    }
  }, [])


  return (
<div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <h1>{loading ? "Processing" : "Reset your password"}</h1>
            <hr />
            <div className="flex flex-col items-start my-6">
                <label htmlFor="email">Password</label>
                <input
                  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    // placeholder="Enter"
                    disabled={disabled}
                    name="password"
                    required
                    title={disabled ? "Cannot process" : "Please fill out this field"}
                    // autoComplete="email"
                />
                <label htmlFor="password">Confirm Password</label>
                <input
                  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={user.confirmPassword}
                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                    // placeholder="password"
                    name="confirmPassword"
                    required
                    disabled={disabled}
                    title={disabled ? "Cannot process" : "Please fill out this field"}
                />
                <button
                  type="submit"
                  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:cursor-not-allowed" 
                  disabled={disabled}
                  title={disabled ? "Cannot process" : "Proceed"}
                  onClick={changePassword}>
                  Reset password
                </button>
            </div>
        </div>
  )
}

export default ResetPage
