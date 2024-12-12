"use client"
import { useState } from "react"
import Tweet from "./tweet"
import { getMoreTweet } from "@/app/(tab)/tweetList/action";

export interface TweetListProps {
    initialTweet:{ 
        title: string;
        id: number;
        created_at: Date;
    }[]
}

export default function TweetList({initialTweet}:TweetListProps){
    const [tweet,setTweet] = useState(initialTweet)
    const [isLoading,setIsLoading] = useState(false)
    const [page,setPage] = useState(0)
    const [isLastPage,setIsLastPage] = useState(false)
    const onLoadMoreClick = async () => {
        setIsLoading(true)
        const nweTweet = await getMoreTweet(page+1)
        if(nweTweet.length !== 0){
            setPage((pre) => pre + 1)
            setTweet((pre) => [...pre,...nweTweet])
        }else{
            setIsLastPage(true)
        }
        setIsLoading(false)
    }
    return(
        <>
            <div>
                {tweet.map(i => (
                    <Tweet key={i.id} {...i}/>
                ))}
                {isLastPage ? (
                    <span className="mx-auto block mt-20 text-center">No more items</span>
                    ) : (
                    <button
                        onClick={onLoadMoreClick}
                        disabled={isLoading}
                        className="text-sm w-fit mx-auto block mt-20 px-3 py-2 rounded-md ring-1 ring-neutral-100 hover:bg-white hover:text-black transition"
                    >
                        {isLoading ? "로딩 중" : "Load more"}
                    </button>
                    )}
                </div>
        </>
    )
}