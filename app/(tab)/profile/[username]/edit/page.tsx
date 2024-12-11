'use server'
import { ProfileUpdateForm } from "@/components/profileUpdate"
import getSession from "@/lib/session"
import { notFound } from "next/navigation"
import { getUser } from "../../action"

export default async function ProfileUpdate() {
    const user = await getUser()
    const session = await getSession()
    if(user.id !== session.id){
        return notFound()
    }
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ProfileUpdateForm user={user}/>
        </div>
    )
}