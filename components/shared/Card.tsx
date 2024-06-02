"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { Project } from "@prisma/client";
import Image from "next/image";

type CardProps = {
   data: Project;
};

const CardComponent = ({ data }: CardProps) => {
   const { isLoaded, isSignedIn, user } = useUser();
   if (!user) return null;
   return (
      <Card className="mx-auto shadow-lg rounded-lg overflow-hidden flex flex-col">
         <Image
            src={data.image}
            alt={data.name}
            width={400}
            height={400}
            objectFit="cover"
            className="w-full p-2  md:min-h-[232px] object-cover"
         />
         <CardContent className="p-4 flex-grow">
            <div className="flex items-center gap-3 mb-4 flex-grow">
               <Image
                  src={user.imageUrl}
                  alt={"user"}
                  width={35}
                  height={35}
                  className="rounded-full"
               />
               <h3 className="font-medium text-lg">{user?.username}</h3>
            </div>
            <h3 className="text-xl font-semibold mb-2">{data.name}</h3>
         </CardContent>
         <div className="bg-gray-300/50 h-px w-full"></div>
         <div className="w-full p-4 mt-auto">
            <h3 className="text-md font-medium">{data.framework}</h3>
         </div>
      </Card>
   );
};

export default CardComponent;
