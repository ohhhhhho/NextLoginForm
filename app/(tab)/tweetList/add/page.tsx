"use client"
import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";
import { uploadTweet } from "./action";
import { ALLOWED_IMAGE_EXTENSIONS, FILE_SIZE_MAX_LIMIT } from "@/lib/constans";



export default function AddTweet(){
    const [state,action] = useActionState(uploadTweet,{fieldErrors:{}})
    const [preview,setPreview] = useState("")
    const onImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target
        if(!files || files.length === 0){
            return
        }
        const file = files[0]
        //파일을 소문자로 변환
        const fileExtension = file.name.split('.').pop()?.toLowerCase()
        //파일이 빈값인지 확인, 배열에 파일의 확장자가 포함되어 있는지 확인
        if(!fileExtension || !ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension)){
            e.target.value = "";
            alert('허용된 이미지 형식은 jpg, jpeg, png, gif, webp만 가능합니다.')
            return
        }
        //파일 크기 확인
        if(file.size > FILE_SIZE_MAX_LIMIT){
            e.target.value = "";
            alert('파일 최대 5mb까지 가능합니다.')
            return
        }
        const url = URL.createObjectURL(file)
        setPreview(url)
    }
    return(
        <div className="mt-16">
        <form action={action} className="p-5 flex flex-row gap-5 justify-center">
          <div>
          <label
            htmlFor="photo"
            className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover w-96 h-96"
            style={{
              backgroundImage:`url(${preview})`
            }}
          >
            {preview === "" ?
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
            </>
            :null}
          </label>
          <input
            onChange={onImageChange}
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className="hidden"
          />
          </div>
          <div className="flex flex-col gap-5">
          <Input name="title" required placeholder="제목" type="text" errors={state?.fieldErrors.title}/>
          <Input
            name="description"
            type="text"
            required
            placeholder="자세한 설명"
          />
          <Button text="작성 완료" />
          </div>
        </form>
      </div>
    )
}