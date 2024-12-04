import db from "@/lib/db"
import getSession from "@/lib/session"
import { formatToTimeAgo } from "@/lib/utills"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"

const getUser = async (userId:number) => {
    const session = await getSession()
    if(session.id){
        return session.id === userId
    }
    return false
}
const getTweet = async (id:number) => {
    const tweet = await db.tweet.findUnique({
        where:{
            id
        },
        include:{
            user:{
                select:{
                    username:true,
                }
            }
        }
    })
    console.log('tweet',tweet)
    return tweet
}

export default async function TweetDetail({params}:{params:{id:string}}){
    const id = Number(params.id)
    if(isNaN(id)){
        return notFound()
    }
    const tweet = await getTweet(id)
    if(!tweet){
        return notFound()
    }
    const isUser = await getUser(tweet.userId)
    const DeleteProduct = async () => {
        "use server"
        await db.tweet.delete({
            where:{
                id
            }
        })
        redirect("/tweetList")
    }
    return(
        <>
            <div className="p-4 m-6 bg-white rounded-xl h-[calc(100vh-120px)] *:text-black">
                <div className="flex flex-row justify-between">
                <span>작성자 : {tweet.user.username}</span>
                <span>{formatToTimeAgo(tweet.updated_at.toString())}</span>
                </div>
                {isUser ? (
                    <form action={DeleteProduct} className="flex justify-end">
                    <button className="text-xs mt-4 text-neutral-400 hover:text-black transform">
                    Delete Tweet
                    </button>
                    </form>
                ) : null}
                <span className="mt-4 block">제목 : {tweet.title}</span>
                <div className="relative w-full h-96">
                    <Image fill className="object-cover" src={tweet.photo} alt={tweet.title}/>
                </div>
                <span>{tweet.description}</span>
            </div>
        </>
    )
}