"use server"
import db from '@/lib/db'
import {z} from 'zod'
import bcrypt from 'bcrypt'
import getSession from '@/lib/session'
import { redirect } from 'next/navigation'

const checkUniqueEmail = async(email:string) => {
    const user = await db.user.findUnique({
        where:{
            email
        },
        select:{
            id:true
        }
    })
    return Boolean(user)
}

const formSchema = z.object({
    email:z.string().refine(email => email.includes('@zod.com'),'Only zod email').refine(checkUniqueEmail,'An account with this email does not exists'),
    password:z.string()
})
interface FormState {
    form: {
        email: string;
        password: string;
    };
    fieldErrors: {
        email?: string[];
        password?: string[];
    };
    success:boolean
}
export const onSubmit = async (prev:FormState, formData:FormData) => {
    const form = {
        email:formData.get("email") as string,
        password:formData.get("password") as string
    }
    const result = await formSchema.spa(form)

    if(!result.success){
        return {
            fieldErrors:result.error.flatten().fieldErrors,
            form,
            success:false
        }
    }else{
        const user = await db.user.findUnique({
            where:{
                email:result.data.email
            },
            select:{
                id:true,
                password:true
            }
        })
        const ok = await bcrypt.compare(result.data.password,user!.password ?? "")

        if(ok){
            const session = await getSession()
            session.id = user!.id
            await session.save()
            redirect('/profile')
        }else{
            return {
                fieldErrors: {
                    password: ['Wrong password'],
                    email: [],
                },
                form,
                success: false,
            }
        }
    }
}