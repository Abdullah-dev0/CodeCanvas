import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@clerk/nextjs/server";
import { PhoneIcon } from "lucide-react";
import Image from "next/image";

export default async function UserCard() {
   const user = await currentUser();
   return (
      <div className="w-[350px]">
         <div className="grid gap-4 mt-6 justify-center">
            <div className="flex flex-col gap-3 justify-center items-center">
               {user?.imageUrl ? (
                  <Image
                     src={user.imageUrl}
                     alt="User Image"
                     width={48}
                     height={48}
                     className="rounded-full"
                  />
               ) : (
                  <Avatar>
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
               )}

               <div className="grid gap-1">
                  <div className="font-semibold">{user?.firstName}</div>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full dark:bg-gray-800">
                  <PhoneIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
               </div>
               <div className="grid gap-1">
                  <div className="font-semibold">{user?.username}</div>
                  <div className="text-gray-500 text-sm dark:text-gray-400">
                     username
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
