"use server"
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constans'
import db from '@/lib/db'
import {z} from 'zod'
import bcrypt from 'bcrypt'
import getSession from '@/lib/session'
import { redirect } from 'next/navigation'

const formSchema = z.object({
    email:z.string().refine(email => email.includes('@zod.com'),'Only zod email'),
    username:z.string().min(5),
    password:z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR),
    password_confirm:z.string()
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
}).refine(({password,password_confirm}) => password === password_confirm,{
    message:"Both passwords should be the same",
    path:["password_confirm"]
})
interface FormState {
    form: {
        email: string;
        username: string;
        password: string;
        password_confirm: string;
    };
    fieldErrors: {
        email?: string[];
        username?: string[];
        password?: string[];
        passwordConfirm?: string[];
    };
    success:boolean
}
export const createAccount = async (prev:FormState, formData:FormData) => {
    const form = {
        email:formData.get("email") as string,
        username:formData.get("username") as string,
        password:formData.get("password") as string,
        password_confirm:formData.get("password_confirm") as string
    }
    const result = await formSchema.spa(form)

    if(!result.success){
        return {
            fieldErrors:result.error.flatten().fieldErrors,
            form,
            success:false
        }
    }else{
        const hashPassword = await bcrypt.hash(result.data.password,12)
        const user = await db.user.create({
            data:{
                username:result.data.username,
                email:result.data.email,
                password:hashPassword
            },
            select:{
                id:true
            }
        })
        const session = await getSession();
        session.id = user.id
        await session.save();
        redirect('/profile');
    }
}