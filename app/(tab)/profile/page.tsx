import db from "@/lib/db"
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation"

const getUser = async () => {
    const session = await getSession()
    if(session){
        const user = await db.user.findUnique({
            where:{
                id:session.id
            }
        })
        if(user){
            return user
        }
    }
    notFound()
}

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
            <form action={logOut} className="absolute top-10 right-10 group">
                <button className="hover:underline hover:underline-offset-2">LogOut</button>
            </form>
            <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Hello! {user.username}</h2>
            </div>
        </>
    )
}