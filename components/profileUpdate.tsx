'use client'
import Input from '@/components/input'
import React, { useActionState} from 'react'
import Button from '@/components/button';
import { updateForm } from '@/app/(tab)/profile/[username]/edit/action';
interface IUserInfo{
    id: number;
    username: string;
    password: string;
    email: string;
    bio: string | null;
    created_at: Date;
    updated_at: Date;
}
export function ProfileUpdateForm({user}: { user: IUserInfo }){
    const [state,dispatch] = useActionState(updateForm,{
        data:{email:'',username:'',password:'',passwordConfirm:''},
        fieldErrors: {}
    })
    return(
        <>
            <form action={dispatch} className='flex flex-col gap-4'>
                <Input name='email' type='text' errors={state?.fieldErrors.email} defaultValue={state?.data.email !== '' ? state?.data.email : user?.email}/>
                <Input name='username' type='text' errors={state?.fieldErrors.username} defaultValue={state?.data.username !== '' ? state?.data.username : user?.username}/>
                <Input name='password' type='password' errors={state?.fieldErrors.password}/>
                <Input name='passwordConfirm' type='password' errors={state?.fieldErrors.passwordConfirm}/>
                <Button text='수정하기'/>
            </form>
        </>
    )
}