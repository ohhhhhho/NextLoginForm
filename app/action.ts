"use server"
import {z} from 'zod'

const formSchema = z.object({
    email:z.string(),
    username:z.string(),
    password:z.string().min(5,"Wrong password")
})
export const onSubmit = async (prev:any, formData:FormData) => {
    const form = {
        email:formData.get("email"),
        username:formData.get("username"),
        password:formData.get("password")
    }
    const result = formSchema.safeParse(form)
    if(!result.success){
        return {
            fieldErrors:result.error.flatten().fieldErrors,
            formData:form,
            success:false
        }
    }else{
        console.log(result.data)
        return {
            formData: {},
            fieldErrors: {},
            success:true
        }
    }
}