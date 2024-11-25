"use server"
import {z} from 'zod'

const formSchema = z.object({
    email:z.string(),
    username:z.string(),
    password:z.string().refine(pre => pre === "12345","Wrong password")
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