"use server"
import { z } from "zod"
import getSession from "@/lib/session"
import db from "@/lib/db"
import { redirect } from "next/navigation"

const tweetSchema = z.object({
    title:z.string({
        required_error:"title is required"
    }),
    description:z.string(),

})
interface FormState {
    fieldErrors: {
        title?: string[];
        description?: string[];
    };
}
export async function uploadTweet(pre:FormState | undefined,formData:FormData) {
    const data = {
        title:formData.get('title'),
        description:formData.get('description')
    }
     //만약 사진을 올릴때 cloud를 사용하지 않고 내 폴더에 직접 저장할 경우 사용
    const result = tweetSchema.safeParse(data)
    if(!result.success){
        return {
            fieldErrors:result.error.flatten().fieldErrors
        }
    }else{
        const session = await getSession()
        if(session.id){
            const tweet = await db.tweet.create({
                data:{
                    title:result.data.title,
                    description:result.data.description,
                    user:{
                        connect:{
                            id:session.id
                        }
                    }
                },
                select:{
                    id:true
                }
            })
            redirect(`/tweetList/${tweet.id}`)
        }
    }
}