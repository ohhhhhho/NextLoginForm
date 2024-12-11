'use client'
import { useState } from "react";
import { getTweetKeyword } from "./action";
import Tweet from "@/components/tweet";
import { TweetListProps } from "@/components/tweet-list";

export default function SearchTweet() {
    const [keyword, setKeyword] = useState("")
    const [tweets, setTweets] = useState<TweetListProps['initialTweet']>([])
    const [searched, setSearched] = useState(false)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (keyword.trim() !== "") {
            const data = await getTweetKeyword(keyword)
            setTweets(data)
            setSearched(true)
        }
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }
    return (
        <>
            <form onSubmit={onSubmit} className="flex flex-row gap-4 items-center justify-center my-10">
                <input 
                    onChange={onChange} 
                    value={keyword} 
                    placeholder="검색어를 입력하세요"
                    className="w-1/3 bg-transparent ring-neutral-400 ring-1 p-2 text-sm focus:outline-none rounded-sm"
                />
                <button className="ring-neutral-400 ring-1 py-2 px-6 text-sm hover:bg-neutral-50 hover:text-neutral-950 transition-colors rounded-sm">검색</button>
            </form>
            {searched && tweets.length === 0 ? (
                <div className="text-center text-neutral-500 my-10">
                    검색 결과가 없습니다.
                </div>
            ) : (
                tweets.map(i => (
                    <Tweet key={i.id} {...i}/>
                ))
            )}
        </>
    )
}