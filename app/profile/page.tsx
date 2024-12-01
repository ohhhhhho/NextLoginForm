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
            <h2>Hello! {user.username}</h2>
            <form action={logOut}>
                <button>LogOut</button>
            </form>
        </>
    )
}