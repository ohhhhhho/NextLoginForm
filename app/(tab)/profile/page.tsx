import getSession from "@/lib/session"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getUser } from "./action"

export default async function Profile(){
    const user = await getUser()
    const logOut = async() => {
        'use server'
        const session = await getSession()
        await session.destroy()
        redirect('/') 
    }
    return(
        <>
            <div className="relative h-screen">
            <form action={logOut} className="absolute top-10 right-6 group">
                <button className="hover:underline hover:underline-offset-2">LogOut</button>
            </form>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h2>Hello! {user.username}</h2>
            </div>
            <Link href={`/profile/${user.username}`} className="flex items-center justify-center text-center absolute bottom-24 right-6 ring-1 ring-neutral-500 text-sm text-neutral-500 size-20 rounded-full hover:text-neutral-100 hover:ring-neutral-100 transition-colors">User<br/>Home</Link>
            </div>
        </>
    )
}