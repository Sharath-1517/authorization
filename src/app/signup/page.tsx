"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            router.push("/login");
            toast.success(`Signup successful`);
        } catch (error: any) {
            const errorMessage = (user.email.length <= 0 || user.username.length <= 0 || user.password.length <= 0) ? "Fill all the fields" : "User already exists"
            toast.error(`Signup failed!\n${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <div className="flex flex-col items-start my-6">
                <label htmlFor="username">Username</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="username"
                    name="username"
                    required
                    autoComplete="name"
                />
                <label htmlFor="email">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                    name="email"
                    required
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
                    name="password"
                    required
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:cursor-not-allowed " onClick={onSignup}>Signup</button>
            </div>
            <Link href="/login" className="hover:underline">Visit login page</Link>
        </div>
    )

}