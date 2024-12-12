import Comment from "@/components/comment"
import LikeButton from "@/components/like-button"
import { ALLOWED_IMAGE_EXTENSIONS } from "@/lib/constans"
import db from "@/lib/db"
import getSession from "@/lib/session"
import { formatToTimeAgo } from "@/lib/utills"
import { unstable_cache } from "next/cache"
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
            },
            comments:{
                select:{
                    id:true,
                    payload:true,
                    userId:true,
                    user:{
                        select:{
                            username:true,
                        }
                    }
                }
            }
        }
    })
    console.log('tweetDetail',tweet)
    return tweet
}

async function getLikeStatus(tweetId:number,userId:number) {
    const isLike = await db.like.findUnique({
        where:{
            id:{
                tweetId,
                userId
            }
        }
    })
    const likeCount = await db.like.count({
        where:{
            tweetId
        }
    })
    return{
        likeCount,
        isLike:Boolean(isLike)
    }
}

async function getCachedLikeStatus(tweetId:number) {
    const session = await getSession()
    const userId = session.id
    const cachedOperation = unstable_cache(getLikeStatus,['tweet-like-status'],{
        tags:[`like-status-${tweetId}`]
    })
    return cachedOperation(tweetId,userId!)
}

export default async function TweetDetail({params}:{params:Promise<{id:string}>}){
    const session = await getSession()
    const {id} = await params
    const numericId = Number(id);

    if(isNaN(numericId)){
        return notFound()
    }
    const tweet = await getTweet(numericId)
    if(!tweet){
        return notFound()
    }
    const isUser = await getUser(tweet.userId)
    const DeleteProduct = async () => {
        "use server"
        await db.tweet.delete({
            where:{
                id:numericId
            }
        })
        redirect("/tweetList")
    }
    const DeleteComment = async (formData: FormData) => {
        "use server"
        const id = Number(formData.get('commentId'))
        await db.comment.delete({
            where: {
                id
            }
        })
    }
    const {likeCount,isLike} = await getCachedLikeStatus(numericId)
    return(
        <>
            <div className="p-4 m-6 bg-white rounded-xl *:text-black mb-24">
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
                <span className="mb-2 block">{tweet.description}</span>
                <LikeButton likeCount={likeCount} isLike={isLike} tweetId={numericId}/>
                <hr className="my-2"/>
                <ul className="flex flex-col gap-2">
                {tweet.comments.map(i => (
                <li key={i.payload} className="flex flex-row items-center gap-4">
                    <span>{i.payload}</span>
                    <span className="text-xs">{i.user.username}</span>
                    {session.id === i.userId && (
                    <form action={DeleteComment}>
                    <input type="hidden" name="commentId" value={i.id} />
                    <button className="text-neutral-400 text-xs hover:text-black">Delete</button>
                </form>
                )} 
                </li>
                ))}
                </ul>
                <Comment id={numericId}/>
            </div>
        </>
    )
}