import db from "@/lib/db"
import getSession from "@/lib/session"
import { notFound } from "next/navigation"

export const getUser = async () => {
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