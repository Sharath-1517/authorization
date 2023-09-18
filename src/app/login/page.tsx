"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";





export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            router.push("/profile");
            toast.success(response.data.message, {
                position: 'top-right'
            });            
        } catch (error: any) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
            setUser(prevState => {
                return {
                    ...prevState,
                    email: "",
                    password: "",
                }
            })
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold">{loading ? "Processing" : "Login"}</h1>
            <hr />
            <Toaster />
            <div className="flex flex-col justify-start mt-5">
                <label htmlFor="email">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                    autoComplete="email"
                />
                <label htmlFor="password">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                />
            </div>
            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-black hover:text-white">
                Login here
            </button>
            <div className="flex justify-between items-center flex-wrap gap-5">
                <Link href="/forgotpassword" className="hover:underline bg-black text-white p-2 rounded-md">Forgot password?</Link>
                <Link href="/signup" className="hover:underline">Visit Signup page</Link>
            </div>
        </div>
    )

}