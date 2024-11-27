"use server"
import {z} from 'zod'

const formSchema = z.object({
    email:z.string().refine(email => email.includes('@zod.com'),'Only zod email'),
    username:z.string().min(5),
    password:z.string().min(10,'Password should be at least 10 characters long').refine(pre => /\d/.test(pre),'Password should contain at least one number')
})
export const onSubmit = async (prev:any, formData:FormData) => {
    const form = {
        email:formData.get("email") as string,
        username:formData.get("username") as string,
        password:formData.get("password") as string
    }
    const result = formSchema.safeParse(form)

    if(!result.success){
        return {
            fieldErrors:result.error.flatten().fieldErrors,
            form,
            success:false
        }
    }else{
        return {
            form: { email: "", username: "", password: "" },
            fieldErrors: {},
            success:true
        }
    }
}