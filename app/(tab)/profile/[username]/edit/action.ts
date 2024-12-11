'use server'

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constans"
import db from "@/lib/db"
import getSession from "@/lib/session"
import { z } from "zod"
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation"

export const updateProfile = async(username:string) => {
    'use server'
    const session = await getSession()
    try{
        const profile = await db.user.findUnique({
            where:{
                id:session.id,
                username
            },
            select:{
                username:true,
                email:true,
                password:true
            }
        })
        return profile
    }catch(e){
        console.error('Error fetching profile:', e);
        return { error: 'Failed to update profile' };
    }
}

const updateProfileSchema = z.object({
    email:z.string().refine(email => email.includes('@zod.com'),'Only zod email'),
    username:z.string().min(5),
    password:z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR),
    passwordConfirm:z.string()
}).superRefine(async({email},ctx) => {
    const user =  await db.user.findUnique({
        where:{
            email
        },
        select:{
            id:true
        }
    })
    if(user){
        ctx.addIssue({
            code:'custom',
            message:'This email is already taken',
            path:['email'],
            fatal:true
        })
        return z.NEVER
    }
}).superRefine(async({username},ctx) => {
    const user =  await db.user.findUnique({
        where:{
            username
        },
        select:{
            id:true
        }
    })
    if(user){
        ctx.addIssue({
            code:'custom',
            message:'This username is already taken',
            path:['username'],
            fatal:true
        })
        return z.NEVER
    }
}).refine(({password,passwordConfirm}) => password === passwordConfirm,{
    message:"Both passwords should be the same",
    path:["passwordConfirm"]
})

interface FormState {
    data: {
        email: string;
        username: string;
        password: string;
        passwordConfirm: string;
    };
    fieldErrors: {
        email?: string[];
        username?: string[];
        password?: string[];
        passwordConfirm?: string[];
    };
}

export const updateForm = async (prev:FormState | undefined,formData:FormData) => {
    const data = {
        email:formData.get('email') as string,
        username:formData.get('username') as string,
        password:formData.get('password') as string,
        passwordConfirm:formData.get("passwordConfirm") as string
    }
    const result = await updateProfileSchema.spa(data)

    if(!result.success){
        return {
            fieldErrors:result.error.flatten().fieldErrors,
            data,
        }
    }else{
        const session = await getSession()
        const hashPassword = await bcrypt.hash(result.data.password,12)
        if(session.id){
            await db.user.update({
                where:{
                    id:session.id
                },
                data:{
                    email:result.data.email,
                    username:result.data.username,
                    password:hashPassword
                },
                select:{
                    id:true
                }
            })
            redirect(`/profile`)
        }
    }
}