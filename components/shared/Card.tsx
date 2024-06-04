"use client";

import { Card, CardContent } from "@/components/ui/card";

import { Project } from "@/types/index";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type CardProps = {
   data: Project;
};

const CardComponent = ({ data }: CardProps) => {
   return (
      <Card className="mx-auto shadow-lg rounded-lg overflow-hidden flex flex-col">
         <Suspense
            fallback={<div className="flex flex-center">Loading...</div>}
         >
            <Image
               src={data.image}
               alt={data.name}
               width={400}
               height={400}
               loading="lazy"
               className="w-full p-2 md:w-[400px] md:h-[200px] object-cover"
            />
         </Suspense>
         <CardContent className="p-4 flex-grow">
            <div className="flex items-center gap-3 mb-4 flex-grow">
               <Image
                  src={data.author.image || "/user.png"}
                  alt={"user"}
                  width={35}
                  height={35}
                  className="rounded-full"
               />
               <h3 className="font-medium text-lg">{data.author?.username}</h3>
            </div>
            <h3 className="text-xl font-semibold mb-2">{data.name}</h3>
         </CardContent>
         <div className="bg-gray-300/50 h-px w-full"></div>
         <div className="w-full p-4 mt-auto flex justify-between ">
            <h3 className="text-md font-medium">{data.framework}</h3>
            <Link href={`/projects/${data.id}`}>
               <ExternalLink />
            </Link>
         </div>
      </Card>
   );
};

export default CardComponent;
