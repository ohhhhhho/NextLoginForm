"use client"
import { dislikePost, likePost } from "@/app/(tab)/tweetList/[id]/action";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { startTransition, useOptimistic } from "react";

interface Props{
    isLike:boolean
    likeCount:number
    tweetId:number
}

export default function LikeButton({likeCount,isLike,tweetId}:Props){
    const [state,reducerFn] = useOptimistic({isLike,likeCount},(prevState,payload)=>{
        return{
            isLike:!prevState.isLike,
            likeCount:prevState.isLike ? prevState.likeCount - 1 : prevState.likeCount + 1
        }
    })
    const onClick = async() => {
        startTransition(() => {
            reducerFn(undefined)
        })
        if(isLike){
            await dislikePost(tweetId)
        }else{
            await likePost(tweetId)
        }
    }
    return(
        <div>
            <button onClick={onClick}>
                {state.isLike ? 
                <HeartIcon className="size-8 text-rose-600"/>
                :
                <HeartIconOutline className="size-8 text-rose-600"/>}
            </button>
        </div>
    )
}