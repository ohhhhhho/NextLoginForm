import Link from "next/link";
import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utills";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import { getUser } from "../action";
const getComment = async (id:number) => {
    const comment = await db.comment.findMany({
        where:{
            userId:id
        },
        include:{
            tweet:{
                select:{
                    description:true
                }
            }
        }
    })
    return comment
}
const getTweet = async (id:number) => {
    const tweet = await db.tweet.findMany({
        where:{
            userId:id
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
    return tweet
}
export default async function UserUploadTweet(){
    const user = await getUser()
    const tweet  = await getTweet(user.id)
    const comment = await getComment(user.id)
    const session = await getSession()
    if(user.id !== session.id){
        return notFound()
    }
    return(
        <>
        <div className="p-10 mb-24">
            <div>
                <h3 className="text-xl">내 정보 <Link href={`${user.username}/edit`} className="text-xs text-neutral-500 hover:underline-offset-2 hover:underline hover:text-neutral-200 transition-colors">Profile Update</Link></h3>
                <div className="flex flex-col gap-1 mt-4">
                    <span>이메일 : {user.email}</span>
                    <span>닉네임 : {user.username}</span>
                </div>
            </div>
            <hr  className="border-neutral-500 mt-6"/>
            <div className="mt-6">
                <h3 className="text-xl">내가 올린 Tweet</h3>
                <ul className="mt-4 max-h-56 overflow-y-scroll box-border grid grid-cols-2 gap-4">
                    {tweet.map(i => (
                        <li key={i.id}>
                            <Link href={`/tweetList/${i.id}`} className="flex flex-col ring-1 ring-neutral-300 p-4 rounded-md box-border ring-inset">
                                <span className="text-xs text-neutral-500">{formatToTimeAgo(i.created_at.toString())}</span>
                                <span className="text-lg font-bold">{i.title}</span>
                                <span>{i.description.slice(0,25)}...</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <hr  className="border-neutral-500 mt-6"/>
            <div className="mt-6">
                <h3 className="text-xl">내가 작성한 댓글들</h3>
                <ul className="mt-4 max-h-56 overflow-y-scroll">
                    {comment.map(i => (
                        <li key={i.id}>
                            <Link href={`/tweetList/${i.tweetId}`} className="flex flex-row gap-6">
                                <div>
                                    <span className="text-sm text-neutral-200">원본 글 : </span>
                                    <span className="text-xs text-neutral-400">{i.tweet.description}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-neutral-200">내가 남긴 댓글 : </span>
                                    <span className="text-xs text-neutral-400">{i.payload}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>
    )
}