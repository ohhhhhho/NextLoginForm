import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { InputHTMLAttributes } from "react";

interface IInput{
    name?:string
    errors?:string[]
    defaultValue?: string;
}

export default function Input({name,errors,defaultValue,...extraProps}:IInput & InputHTMLAttributes<HTMLInputElement>){
    const svgIcon = () => {
        if (name === "email") return <EnvelopeIcon />
        if (name === "username") return <UserIcon />
        if (name === "password") return <KeyIcon />
        if (name === "password_confirm") return <KeyIcon />
      }
    return(
        <>
        <div className="flex flex-row relative">
            <span className="*:size-6 absolute left-2.5 top-1/2 transform -translate-y-1/2">{svgIcon()}</span>
            <input name={name} className={`ring-2 ring-gray-200 rounded-full focus:outline-offset-4 focus:outline-gray-400 py-3 px-5 text-black w-96 indent-5 ${errors && errors.length >= 1 ? `focus:outline-red-600 ring-red-600` : ''}`} {...extraProps} defaultValue={defaultValue}/>
        </div>
        {errors?.map((i,idx) => 
            <span key={idx} className="text-red-500 text-sm">{i}</span>
          )}
          </>
    )
}