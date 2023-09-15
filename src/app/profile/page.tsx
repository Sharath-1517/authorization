"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, {Toaster} from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState('nothing');

  const logout = async() => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
      toast.success("Successfully logged out");
    } catch (error:any) {
      console.log(error.message);
      toast.error(`Logged out with error! \n${error.message}`);
    }
  }

  
  useEffect(() => {
    const getUserDetails = async () => {
      const response = axios.get('/api/users/me');
      setData((await response).data.data._id);
    }

    getUserDetails();
  })

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <Toaster />
      <h1 className="text-2xl">Profile Page</h1>
      <h2 className="text-xl my-3">{data === 'nothing' ? "User data is loading..." : <Link href={`/profile/${data}`} className="hover:underline text-green-600">Data found! click here to redirect to personal profile</Link> }</h2>
      <button className='bg-black p-2 text-white rounded-lg hover:bg-white hover:text-black hover:border-black border-[3px] border-transparent' onClick={logout}>Logout</button>
    </div>
  )
}

export default ProfilePage
