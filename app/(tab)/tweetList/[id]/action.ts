"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export const likePost = async (tweetId:number) => {
    'use server'
    const session = await getSession()
    try{
        await db.like.create({
            data:{
                    tweetId,
                    userId:session.id!
            }
        })
        revalidateTag(`like-status-${tweetId}`)
    }catch(e){
        console.error('Error fetching profile:', e);
        return { error: 'Failed to update profile' };
    }
}

export const dislikePost = async(tweetId:number) => {
    'use server'
    const session = await getSession()
    try{
        await db.like.delete({
            where:{
                id:{
                    tweetId,
                    userId:session.id!
                }
            }
        })
        revalidateTag(`like-status-${tweetId}`)
    }catch(e){
        console.error('Error fetching profile:', e);
        return { error: 'Failed to update profile' };
    }
}

const commentSchema = z.object({
    textareaComment:z.string().min(5,'5글자 이상 작성하셔야 합니다')
})

interface FormState {
    id:number,
    fieldErrors: {
        textareaComment?: string[];
    };
}

export async function createComment(prev:FormState,formData:FormData) {
    const form = {
        textareaComment:formData.get('textareaComment') as string
    }
    if (!form.textareaComment) {
        return {
            ...prev,
            fieldErrors: {
                textareaComment: ['Comment is required.']
            }
        };
    }
    const result = await commentSchema.spa(form)
    if(!result.success){
        return {
            ...prev,
            fieldErrors:result.error.flatten().fieldErrors
        }
    }else{
        const session = await getSession();
        if (!session || !session.id) {
            throw new Error('사용자가 로그인되지 않았습니다.');
        }
        if (!prev.id) {
            throw new Error('Tweet ID가 유효하지 않습니다.');
        }
        await db.comment.create({
            data:{
                payload:result.data.textareaComment,
                user:{
                    connect:{
                        id:session.id
                    }
                },
                tweet:{
                    connect:{
                        id:prev.id
                    }
                }
            },
            select:{
                id:true
            }
        })
        redirect(`/tweetList/${prev.id}`)
    }
}