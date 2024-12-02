"use client"
import {
    HomeIcon as SolidHomeIcon,
    NewspaperIcon as SolidNewspaperIcon,
    ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
    VideoCameraIcon as SolidVideoCameraIcon,
    UserIcon as SolidUserIcon,
  } from "@heroicons/react/24/solid";
  import {
    HomeIcon as OutlineHomeIcon,
    NewspaperIcon as OutlineNewspaperIcon,
    ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
    VideoCameraIcon as OutlineVideoCameraIcon,
    UserIcon as OutlineUserIcon,
  } from "@heroicons/react/24/outline";
  import Link from "next/link";
  import { usePathname } from "next/navigation";
  export default function TabBar() {
    const pathname = usePathname();
    return (
      <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-2 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800">
        <Link href="/profile" className="flex flex-col items-center gap-px">
          {pathname === "/profile" ? (
            <SolidHomeIcon className="w-7 h-7" />
          ) : (
            <OutlineHomeIcon className="w-7 h-7" />
          )}
          <span>프로필</span>
        </Link>
        <Link href="/tweetList" className="flex flex-col items-center gap-px">
          {pathname === "/tweetList" ? (
            <SolidNewspaperIcon className="w-7 h-7" />
          ) : (
            <OutlineNewspaperIcon className="w-7 h-7" />
          )}
          <span>트윗</span>
        </Link>
      </div>
    );
  }