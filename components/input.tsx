import { InputHTMLAttributes } from "react";

interface IInput{
    errors?:string[],
    defaultValue?: string;
}

export default function Input({errors,defaultValue,...extraProps}:IInput & InputHTMLAttributes<HTMLInputElement>){
    return(
        <>
        <input className={`ring-2 ring-gray-200 rounded-full focus:outline-offset-4 focus:outline-gray-400 py-3 px-5 text-black w-96 ${errors && errors.length >= 1 ? `focus:outline-red-600 ring-red-600` : ''}`} {...extraProps} defaultValue={defaultValue}/>
        {errors?.map((i,idx) => 
            <span key={idx} className="text-red-500 text-sm">{i}</span>
          )}
          </>
    )
}